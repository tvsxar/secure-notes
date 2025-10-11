const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AuthRoutes = require('./routes/auth');
const NoteRoutes = require('./routes/notes');

// Setting up environment variables
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3333;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', AuthRoutes);
app.use('/notes', NoteRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});