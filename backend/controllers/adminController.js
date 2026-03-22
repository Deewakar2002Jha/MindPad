const { clerkClient } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Admin Login Attempt: ${email}`);
        
        // Ensure MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            console.log("Database not ready, check connection string...");
            return res.status(503).json({ message: "Database is connecting, please try again in a moment" });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            console.log("No admin found with this email");
            return res.status(401).json({ message: 'Invalid admin credentials' });
        }

        const isMatch = await admin.comparePassword(password);
        if (isMatch) {
            const token = jwt.sign(
                { id: admin._id, email: admin.email, role: 'admin' },
                process.env.JWT_SECRET || 'fallback_secret_for_dev',
                { expiresIn: '24h' }
            );
            return res.status(200).json({ token, role: 'admin' });
        } else {
            console.log("Password mismatch");
            return res.status(401).json({ message: 'Invalid admin credentials' });
        }
    } catch (error) {
        console.error('CRITICAL Admin Login Error:', error);
        res.status(500).json({ message: 'Server error during login', details: error.message });
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
        const users = await clerkClient.users.getUserList({
            limit: 100, // adjust as needed
        });

        // Return required fields
        const formattedUsers = users.data.map(u => ({
            id: u.id,
            email: u.emailAddresses[0]?.emailAddress,
            role: u.publicMetadata?.role || 'user',
            banned: u.banned, // Or use locked/banned according to Clerk's logic
        }));

        res.status(200).json(formattedUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error fetching users' });
    }
};

exports.getUserCount = async (req, res) => {
    try {
        const count = await clerkClient.users.getCount();
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Server error fetching user count' });
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
