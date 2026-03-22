const express = require('express');
const router = express.Router();
const { requireUserAuth, requireAdminAuth } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// All admin routes require basic auth AND admin auth
router.use(requireUserAuth, requireAdminAuth);

router.get('/users', adminController.getUsers);
router.get('/user-count', adminController.getUserCount);
router.delete('/users/:id', adminController.deleteUser);
router.put('/users/:id/ban', adminController.banUser);

module.exports = router;
