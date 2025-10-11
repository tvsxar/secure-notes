const jwt = require('jsonwebtoken');
const pool = require('../config/db');

require('dotenv').config();

const protectMiddleware = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token;

        // Check if token exists
        if (!token) {
            return res.status(401).json({message: 'Not authorized'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await pool.query(
            'SELECT id, username, email FROM users WHERE id = $1',
            [decoded.id]
        )

        if (user.rows.length === 0) {
            return res.status(401).json({message: 'Not authorized'});
        }

        req.user = user.rows[0];
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({message: 'Not authorized'});
    }
}

module.exports = protectMiddleware;