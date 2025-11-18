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

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  })
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});