const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Secret key for JWT (change this for production)
const JWT_SECRET_KEY = 'your-secret-key';

// Mock database for storing users
let users = [];

// Middleware for handling CORS and parsing JSON bodies
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory (after the build step)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(403).send('Access denied.');

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send('Invalid token.');
    req.user = user;
    next();
  });
};

// Sign up route
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) return res.status(400).send('User already exists');

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send('Error hashing password');
    users.push({ email, password: hashedPassword });
    res.status(200).send('User created successfully');
  });
});

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).send('User not found');

  bcrypt.compare(password, user.password, (err, result) => {
    if (!result) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ email: user.email }, JWT_SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  });
});

// Fetch messages (Protected route)
app.get('/api/messages', authenticateJWT, (req, res) => {
  res.json([{ message: 'Hello, world!' }]);
});

// Save message (Protected route)
app.post('/api/messages', authenticateJWT, (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send('Message is required');

  res.status(200).json({ message: 'Message saved successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
