const { Pool } = require('pg');
require('dotenv').config();

// For local development without DATABASE_URL
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

// For deployment with DATABASE_URL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err) => {
    console.error('Database error', err);
});

module.exports = pool;