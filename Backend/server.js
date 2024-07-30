const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'Momdad@1027', // Replace with your MySQL password
  database: 'Whitepaper_db'
});

app.use(cors());
app.use(bodyParser.json());

app.post('/api/save-email', (req, res) => {
  const { email } = req.body;

  if (email) {
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send('Invalid email format');
    }

    // Insert the email into the database
    pool.query('INSERT INTO emails (email) VALUES (?)', [email], (err, results) => {
      if (err) {
        console.error('Error saving email:', err);
        return res.status(500).send('Error saving email');
      }
      res.send('Email saved');
    });
  } else {
    res.status(400).send('Email is required');
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
