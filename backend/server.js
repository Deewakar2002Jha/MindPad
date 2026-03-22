require('dotenv').config({ override: true });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { clerkMiddleware } = require('@clerk/express');
const app = express();
app.use(cors());
app.use(express.json());

// Apply Clerk middleware globally to parse tokens
app.use(clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY
}));

// Routes
const notesRoutes = require('./routes/notes');
const adminRoutes = require('./routes/admin');

app.use(['/notes', '/api/notes'], notesRoutes);
app.use(['/admin', '/api/admin'], adminRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error', err);
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
