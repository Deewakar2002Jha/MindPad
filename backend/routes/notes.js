const express = require('express');
const router = express.Router();
const { requireUserAuth } = require('../middleware/auth');
const notesController = require('../controllers/notesController');

// All notes routes require authentication
router.use(requireUserAuth);

router.post('/', notesController.createNote);
router.get('/', notesController.getNotes);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

module.exports = router;
