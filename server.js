// server.js
const express = require('express');
const session = require('express-session');
const path = require('path');  // Add this line for working with file paths
const mysql = require('mysql2');

const app = express();
const port = 3000;

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abhi@1102#',
    database: 'carpooling_db'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Set server timeout to 2 minutes (120,000 milliseconds)
app.timeout = 120000;

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add this middleware to serve static files
app.use(express.static('D:/Abhi/Personal/Carpooling/public'));

// Configure express-session
app.use(session({
    secret: 'abhi@1102', // Replace with a secure secret key
    resave: false,
    saveUninitialized: true
}));

// API endpoints go here
// Serve the home page
app.get('/', (req, res) => {
    res.sendFile('D:/Abhi/Personal/Carpooling/public/home.html');
});

// Serve the signup page
/*app.get('/signup', (req, res) => {
    res.sendFile('D:/Abhi/Personal/Carpooling/public/signup.html');
});*/

// Serve the profile page
app.get('/profile', (req, res) => {
    res.sendFile('D:/Abhi/Personal/Carpooling/public/profile.html');
});

// API endpoint to fetch user profile data
app.get('/getUserProfile', (req, res) => {
    const username = req.session.username;

    if (!username) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, result) => {
        if (err) {
            console.error('Error fetching user profile:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: 'User not found' });
            } else {
                const user = result[0];
                res.json(user);
            }
        }
    });
});

// API endpoint for user login
app.post('/login', (req, res) => {
    console.log('Login request received:', req.body);

    const { username, phone } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND phone = ?';
    db.query(query, [username, phone], (err, result) => {
        if (err) {
            console.error('Error during login:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (result.length === 0) {
                // No matching user found
                res.status(401).json({ error: 'Invalid credentials', details: 'No matching user found' });
            } else {
                // User successfully authenticated
                req.session.username = username;
                res.status(200).json({ success: true });
            }
        }
    });
});

app.post('/signup', (req, res) => {
    const { username, name, email, phone, mobileNo, gender, userType } = req.body;

    const query = 'INSERT INTO users (username, name, email, phone, mobile_no, gender, user_type) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [username, name, email, phone, mobileNo, gender, userType], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).send('Internal Server Error');
        } else {
            req.session.username = username;
            res.status(201).json({ name });
            // Redirect to the profile page on successful signup
           // res.redirect('/profile');
        }
    });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
