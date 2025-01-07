const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME ,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors({
    origin: 'http://localhost:3000', // This allows requests from your frontend (localhost:3001)
    methods: ['GET', 'POST'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
  }));
// Middleware
app.use(bodyParser.json());

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Signup endpoint
app.post('/signup', async (req, res) => {
    console.log(req.body);  // Log the received data
    const { role, username, password, adminId } = req.body;
  
    try {
      if (role === 'user') {
        const result = await pool.query(
          'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
          [username, password]
        );
        return res.status(201).json({ message: 'User registered successfully', userId: result.rows[0].id });
      } else if (role === 'admin') {
        // Log to confirm that admin_id is received correctly
        console.log('Admin ID:', adminId);
  
        const result = await pool.query(
          'INSERT INTO admin (admin_id, password) VALUES ($1, $2) RETURNING id',
          [adminId, password]
        );
        return res.status(201).json({ message: 'Admin registered successfully', adminId: result.rows[0].id });
      } else {
        return res.status(400).json({ message: 'Invalid role' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error registering user or admin', error: error.message });
    }
  });
  
  
  // Login endpoint
app.post('/login', async (req, res) => {
    const { role, username, password } = req.body;
    console.log(password);
    try {
      let user;
      if (role === 'user') {
        const result = await pool.query(
          'SELECT * FROM users WHERE username = $1 AND password = $2',
          [username, password]
        );
        user = result.rows[0];
        if (!user) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
  
        // Generate token for user
        const token = jwt.sign({ id: user.id, role }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'User login successful', token, role: 'user' });
      } else if (role === 'admin') {
        const result = await pool.query('SELECT * FROM admin WHERE password = $1', [password]);
        user = result.rows[0];
        if (!user) {
          return res.status(401).json({ message: 'Invalid admin ID or password' });
        }
  
        // No token for admin
        return res.status(200).json({ message: 'Admin login successful', role: 'admin' });
      } else {
        return res.status(400).json({ message: 'Invalid role' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  });
//   // Path to your dataset
// const datasetPath = path.join(__dirname, 'sample.json');

// // Endpoint to fetch, modify, and send the dataset
// app.get('/batch_predict', (req, res) => {
//   console.log("Received request for batch_predict");

//   fs.readFile(datasetPath, 'utf8', (err, data) => {
//       if (err) {
//           console.error("Error reading the dataset file:", err);
//           return res.status(500).json({ error: 'Error reading the dataset file' });
//       }

//       let dataset;
//       try {
//           dataset = JSON.parse(data);
//           console.log("Dataset loaded:", dataset);  // Log the dataset
//       } catch (parseError) {
//           console.error("Error parsing the dataset file:", parseError);
//           return res.status(500).json({ error: 'Error parsing the dataset file' });
//       }

//       // Modify the dataset (add suspicious column)
//       dataset = dataset.map(item => {
//           item.suspicious = item.laundry === 'suspicious' ? true : false; // Custom logic
//           return item;
//       });

//       console.log("Modified dataset:", dataset);  // Log the modified dataset

//       // Send the updated dataset to the frontend
//       return res.json(dataset);
//   });
// });


  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });