const express = require('express');
const router = express.Router();
const { requireUserAuth, requireAdminAuth } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.post('/login', adminController.login);

// All other admin routes require admin auth (Clerk OR Custom JWT)
router.use(requireAdminAuth);

router.get('/users', adminController.getUsers);
router.get('/user-count', adminController.getUserCount);
router.delete('/users/:id', adminController.deleteUser);
router.put('/users/:id/ban', adminController.banUser);

module.exports = router;
