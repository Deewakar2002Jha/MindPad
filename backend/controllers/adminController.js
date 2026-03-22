const { clerkClient } = require('../middleware/auth');

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
