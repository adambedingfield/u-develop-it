const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const accDetails = require('./account');
// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // your MySQL username
        user: accDetails.username,
        // Your MySQL password
        password: accDetails.pWord,
        database: 'election'
    },
    console.log('Connected to the election database.')
);

db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

// Default response for any other request (not found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});