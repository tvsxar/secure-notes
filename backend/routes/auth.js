const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const router = express.Router();
const generateToken = require('../utils/generateToken');

require('dotenv').config();

// Cookie options setup
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
}

// Register User
router.post('/register', async (req, res) => {
    try {
        let {username, email, password} = req.body;

        // Trim and normalize inputs
        email = email.trim().toLowerCase();
        username = username.trim(); 

        // Basic validation
        if(!username || !email || !password) {
            return res.status(400).json({message: 'Please provide all required fields'});
        }

        // Check if user exists
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);

        // If user exists, return error
        if(existingUser.rows.length > 0) {
            return res.status(400).json({message: 'User with this email or username already exists'});
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email`,
            [username, email, hashedPassword]
        );

        const token = generateToken(newUser.rows[0].id);

        // Set cookie
        res.cookie('token', token, cookieOptions);

        res.status(201).json({message: 'User successfully registered!', user: newUser.rows[0]})
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({message: 'Server error'});
    }
})

// Login User
router.post('/login', async (req, res) => {
    try {
        let {usernameOrEmail, password} = req.body;

        // Trim and normalize inputs
        usernameOrEmail = usernameOrEmail.trim().toLowerCase();

        // Basic validation
        if(!usernameOrEmail || !password) {
            return res.status(400).json({message: 'Please provide all required fields'});
        }

        // Check if user exists
        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1 OR username = $1',
            [usernameOrEmail]
        )

        if(user.rows.length === 0) {
            return res.status(400).json({message: 'User not found'});
        }

        const userData = user.rows[0];

        // Check if password is correct
        const validePassword = await bcrypt.compare(password, userData.password);

        if(!validePassword) {
            return res.status(400).json({message: 'Wrong password'});
        }

        const token = generateToken(userData.id);

        // Set cookie
        res.cookie('token', token, cookieOptions);

        res.status(200).json({message: 'Login successful', user: {
            id: userData.id,
            username: userData.username,
            email: userData.email
        }})
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({message: 'Server error'});
    }
})

// Logout User
router.post('/logout', async (req, res) => {
    res.cookie('token', '', { ...cookieOptions, maxAge: 1 });
    res.status(200).json({message: 'Logout successful'})
})

// Me
router.get('/me', async (req, res) => {
    // Return info of the logged in user from protect middleware
    res.json(req.user)
})

module.exports = router;