const jwt = require('jsonwebtoken');
const { requireAuth, createClerkClient, clerkClient, getAuth } = require('@clerk/express');

// The clerkClient instance is automatically initialized
const client = createClerkClient({ 
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY 
});

// Middleware for requiring a valid authenticated user
const requireUserAuth = requireAuth();

// Middleware for requiring Admin role
const requireAdminAuth = async (req, res, next) => {
    try {
        // Check for Custom Admin JWT first (Bearer token)
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_for_dev');
                if (decoded && decoded.role === 'admin') {
                    req.admin = decoded; // Attach custom admin info if needed
                    return next();
                }
            } catch (err) {
                // Not a valid JWT or expired, but we will still check Clerk below
                console.log('Not a valid custom JWT, checking Clerk...');
            }
        }

        // Standard Clerk Auth check
        const authInfo = getAuth(req);
        const userId = authInfo.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await client.users.getUser(userId);
        if (user.publicMetadata?.role === 'admin') {
            return next();
        } else {
            return res.status(403).json({ message: 'Forbidden: Admin access required' });
        }
    } catch (error) {
        console.error('Admin Check Error:', error);
        return res.status(500).json({ message: 'Internal server error during authorization' });
    }
};

module.exports = {
    requireUserAuth,
    requireAdminAuth,
    clerkClient: client
};
