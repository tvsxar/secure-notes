const express = require('express');
const pool = require('../config/db');
const router = express.Router();
const protectMiddleware = require('../middleware/protectMiddleware');

// Setting up environment variables
require('dotenv').config();

// Create a new note
router.post('/', protectMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;

        // Check if title & description exists and not empty
        if (!title || !description || title.trim() === '' || description.trim() === '') {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        const newNote = await pool.query(
            `INSERT INTO notes (title, description, user_id) 
            VALUES ($1, $2, $3) 
            RETURNING *`,
            [title, description, userId]
        )

        res.status(201).json({message: 'Note is successfully created', note: newNote.rows[0]})
    } catch (err) {
        console.error('Error creating note:', err.message);
        res.status(500).json({message: 'Server error'});
    }
})

// Get all notes of current user
router.get('/', protectMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { search } = req.query;

        let allNotes;

        if (search) {
            allNotes = await pool.query(
                `SELECT * FROM notes 
                WHERE user_id = $1 
                AND (title ILIKE $2 OR description ILIKE $2)
                ORDER BY created_at DESC`,
                [userId, `%${search}%`]
            )
        } else {
            allNotes = await pool.query(
                `SELECT * FROM notes 
                WHERE user_id = $1 
                ORDER BY created_at DESC`,
            [userId]
            )
        }

        res.status(200).json({message: 'Getting all notes successfully', notes: allNotes.rows})
    } catch (err) {
        console.error('Error getting notes:', err.message);
        res.status(500).json({message: 'Server error'});
    }
})

// Update selected note of current user
router.put('/:id', protectMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;
        const { id } = req.params;

        // Check if title & description exists and not empty
        if (!title || !description || title.trim() === '' || description.trim() === '') {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        const updatedNote = await pool.query(
            `UPDATE notes SET title = $1, description = $2 
            WHERE id = $3 
            AND user_id = $4
            RETURNING *`,
            [title, description, id, userId]
        )

        if (updatedNote.rows.length === 0) {
            return res.status(404).json({ message: 'Note not found or not authorized' });
        }

        res.status(200).json({message: 'Note updated successfully', note: updatedNote.rows[0]});
    } catch (err) {
        console.error('Error updating note:', err.message);
        res.status(500).json({message: 'Server error'});
    }
})

// Delete selected note of current user
router.delete('/:id', protectMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const deletedNote = await pool.query(
            `DELETE FROM notes 
            WHERE id = $1 
            AND user_id = $2
            RETURNING *`,
            [id, userId]
        )

        if (deletedNote.rows.length === 0) {
            return res.status(404).json({ message: 'Note not found or not authorized' });
        }

        res.status(200).json({message: 'Note was deleted successfully'});
    } catch (err) {
        console.error('Error deleting note:', err.message);
        res.status(500).json({message: 'Server error'});
    }
})

module.exports = router;