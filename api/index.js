const express = require('express');
const app = require('../backend/server');

// This tells Express that our Vercel function is mounted at /api
// so it can correctly route requests like /api/notes to /notes
const mainApp = express();
mainApp.use('/api', app);

module.exports = mainApp;
