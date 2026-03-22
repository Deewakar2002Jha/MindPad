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
        const authInfo = getAuth(req);
        const userId = authInfo.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Fetch user from Clerk directly to check metadata
        // Note: auth middleware might attach claims to req.auth.sessionClaims if configured, 
        // but fetching from clerk ensures fresh role check
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
