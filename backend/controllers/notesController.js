const Note = require('../models/Note');
const { getAuth } = require('@clerk/express');

exports.createNote = async (req, res) => {
    try {
        const authInfo = getAuth(req);
        const userId = authInfo.userId;
        const { title, body } = req.body;

        if (!title || !body) {
            return res.status(400).json({ message: 'Title and body are required' });
        }

        const newNote = await Note.create({ userId, title, body });
        res.status(201).json(newNote);
    } catch (error) {
        require('fs').writeFileSync('error_log.txt', error.stack || error.message || String(error));
        console.error('Error creating note:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getNotes = async (req, res) => {
    try {
        const authInfo = getAuth(req);
        const userId = authInfo.userId;
        const notes = await Note.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        require('fs').writeFileSync('error_log.txt', error.stack || error.message || String(error));
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const authInfo = getAuth(req);
        const userId = authInfo.userId;
        const { id } = req.params;
        const { title, body } = req.body;

        const note = await Note.findOneAndUpdate(
            { _id: id, userId },
            { title, body },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(note);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const authInfo = getAuth(req);
        const userId = authInfo.userId;
        const { id } = req.params;

        const note = await Note.findOneAndDelete({ _id: id, userId });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
