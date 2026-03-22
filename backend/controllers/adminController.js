const { clerkClient } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Admin Login Attempt: ${email}`);
        
        // Ensure MongoDB is connected (Wait up to 2 seconds if connecting)
        let attempts = 0;
        while (mongoose.connection.readyState !== 1 && attempts < 10) {
            console.log(`Waiting for DB... (Attempt ${attempts + 1})`);
            await new Promise(resolve => setTimeout(resolve, 200));
            attempts++;
        }

        if (mongoose.connection.readyState !== 1) {
            console.error("CRITICAL: Database connection failed or timed out.");
            return res.status(503).json({ message: "Database is connecting, please try again in a moment" });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            console.log("LOGIN FAILED: Admin not found");
            return res.status(401).json({ message: 'Invalid admin credentials' });
        }

        // Use bcrypt directly for better reliability in serverless
        const isMatch = await bcrypt.compare(password, admin.password);
        
        if (isMatch) {
            console.log("LOGIN SUCCESS: Issuing token");
            const token = jwt.sign(
                { id: admin._id, email: admin.email, role: 'admin' },
                process.env.JWT_SECRET || 'fallback_secret_for_dev',
                { expiresIn: '24h' }
            );
            return res.status(200).json({ token, role: 'admin' });
        } else {
            console.log("LOGIN FAILED: Password mismatch");
            return res.status(401).json({ message: 'Invalid admin credentials' });
        }
    } catch (error) {
        console.error('CRITICAL SERVER ERROR during admin login:', error);
        res.status(500).json({ 
            message: 'Server error during login', 
            details: error.message,
            stack: error.stack 
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminId = req.admin.id; // From middleware

        const admin = await Admin.findById(adminId);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        if (email) admin.email = email;
        if (password) admin.password = password; // Hashing will be done by pre-save hook

        await admin.save();
        res.status(200).json({ message: 'Admin profile updated successfully' });
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: 'Server error updating profile' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        // Ensure MongoDB connection is ready first
        let attempts = 0;
        while (mongoose.connection.readyState !== 1 && attempts < 10) {
            await new Promise(resolve => setTimeout(resolve, 200));
            attempts++;
        }

        const users = await clerkClient.users.getUserList({
            limit: 100,
        });

        const formattedUsers = users.data.map(u => ({
            id: u.id,
            email: u.emailAddresses[0]?.emailAddress,
            role: u.publicMetadata?.role || 'user',
            banned: u.banned,
        }));

        res.status(200).json(formattedUsers);
    } catch (error) {
        console.error('CRITICAL: Error fetching users from Clerk:', error);
        res.status(500).json({ message: 'Server error fetching users', details: error.message });
    }
};

exports.getUserCount = async (req, res) => {
    try {
        const count = await clerkClient.users.getCount();
        res.status(200).json({ count });
    } catch (error) {
        console.error('CRITICAL: Error fetching user count from Clerk:', error);
        res.status(500).json({ message: 'Server error fetching user count', details: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await clerkClient.users.deleteUser(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error deleting user' });
    }
};

exports.banUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Clerk supports banUser or update user metadata. You can ban them officially using the API:
        const user = await clerkClient.users.banUser(id);

        res.status(200).json({ message: 'User banned successfully', user });
    } catch (error) {
        console.error('Error banning user:', error);
        res.status(500).json({ message: 'Server error banning user' });
    }
};
