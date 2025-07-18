const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const app = express();
const PORT = 5000;
require('dotenv').config(); // Load environment variables

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});


// Secret Key for JWT
const JWT_SECRET = process.env.JWT_SECRET;
// Registration Endpoint
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Database query error' });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
    [name, email, hashedPassword], 
    (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Error inserting user' });
      }

      // Create JWT token
      const token = jwt.sign({ email, name }, JWT_SECRET, { expiresIn: '1h' });

      return res.status(201).json({
        message: 'User registered successfully',
        token // Send the token to the client
      });
    });
  });
});

// Login Endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Database query error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Create JWT token with user ID
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1h' });

    console.log("user: ", user);

    // Send the token to the client
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: user,
      token: token // Send the token to the client
    });
  });
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Token is sent in the 'Authorization' header, usually as "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    // Save the decoded user data (user id, email, etc.) to the request object
    req.user = decoded;
    next(); // Call the next middleware or route handler
  });
};

// Caretaker Profile Endpoint (UserProfile.js)
app.post('/caretaker', verifyToken, (req, res) => {
  const { name, email, phone, address, relationship } = req.body;
  const user_id = req.user.id; // Extract user ID from the JWT token

  // Check if the user already has a caretaker profile
  const checkQuery = 'SELECT * FROM caretakers WHERE user_id = ?';
  db.query(checkQuery, [user_id], (error, results) => {
    if (error) {
      console.error('Error checking caretaker profile:', error);
      return res.status(500).json({ message: 'Error checking caretaker profile' });
    }

    if (results.length > 0) {
      // If profile exists, update it
      const updateQuery = 'UPDATE caretakers SET name = ?, email = ?, phone = ?, address = ?, relationship = ? WHERE user_id = ?';
      const updateValues = [name, email, phone, address, relationship, user_id];

      db.query(updateQuery, updateValues, (error, updateResults) => {
        if (error) {
          console.error('Error updating caretaker profile:', error);
          return res.status(500).json({ message: 'Error updating caretaker profile' });
        }

        return res.status(200).json({ message: 'Caretaker profile updated successfully' });
      });
    } else {
      // If profile doesn't exist, create a new one
      const insertQuery = 'INSERT INTO caretakers (user_id, name, email, phone, address, relationship) VALUES (?, ?, ?, ?, ?, ?)';
      const insertValues = [user_id, name, email, phone, address, relationship];

      db.query(insertQuery, insertValues, (error, insertResults) => {
        if (error) {
          console.error('Error inserting caretaker profile:', error);
          return res.status(500).json({ message: 'Error saving caretaker profile' });
        }

        return res.status(200).json({ message: 'Caretaker profile saved successfully' });
      });
    }
  });
});


app.post('/children', verifyToken, (req, res) => {
  const { name, age, height, weight, emergencyContact, medicalConditions, additionalNotes } = req.body;
  const user_id = req.user.id; // Extract user ID from the JWT token

  // Validate inputs
  if (!name || !age || !emergencyContact) {
    return res.status(400).json({ message: 'Name, age, and emergency contact are required fields' });
  }

  // Convert empty height and weight to NULL if necessary
  const validHeight = height === '' ? null : parseFloat(height);
  const validWeight = weight === '' ? null : parseFloat(weight);

  // Check if the user already has a child profile
  const checkQuery = 'SELECT * FROM children WHERE user_id = ?';
  db.query(checkQuery, [user_id], (error, results) => {
    if (error) {
      console.error('Error checking child profile:', error);
      return res.status(500).json({ message: 'Error checking child profile' });
    }

    if (results.length > 0) {
      // If profile exists, update it
      const updateQuery = 'UPDATE children SET name = ?, age = ?, height = ?, weight = ?, emergencyContact = ?, medicalConditions = ?, additionalNotes = ? WHERE user_id = ?';
      const updateValues = [name, age, validHeight, validWeight, emergencyContact, medicalConditions, additionalNotes, user_id];

      db.query(updateQuery, updateValues, (error, updateResults) => {
        if (error) {
          console.error('Error updating child profile:', error);
          return res.status(500).json({ message: 'Error updating child profile' });
        }

        return res.status(200).json({ message: 'Child profile updated successfully' });
      });
    } else {
      // If profile doesn't exist, create a new one
      const insertQuery = 'INSERT INTO children (user_id, name, age, height, weight, emergencyContact, medicalConditions, additionalNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const insertValues = [user_id, name, age, validHeight, validWeight, emergencyContact, medicalConditions, additionalNotes];

      db.query(insertQuery, insertValues, (error, insertResults) => {
        if (error) {
          console.error('Error inserting child profile:', error);
          return res.status(500).json({ message: 'Error saving child profile' });
        }

        return res.status(200).json({ message: 'Child profile saved successfully' });
      });
    }
  });
});


// Route to get user data (use verifyToken to check if the request has a valid token)
app.get('/user', verifyToken, (req, res) => {
  const userId = req.user?.id;

  const query = 'SELECT name, email FROM users WHERE id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching user data' });
    }
    if (result.length > 0) {
      res.json(result[0]);  // Send the user data (name, email) as response
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



// Endpoint to get child data by user ID
app.get('/children/:userId', (req, res) => {
  const userId = req.params.userId;

  db.query('SELECT * FROM children WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Endpoint to get milestones by child age
app.get('/milestones/child/:childId', (req, res) => {
  const childId = req.params.childId;
  console.log('Route hit! childId:', childId); // Debugging log

  db.query('SELECT age, medicalConditions FROM children WHERE child_id = ?', [childId], (err, childResults) => {
    if (err) {
      console.error('Database error (children):', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (childResults.length === 0) {
      return res.status(404).json({ error: 'Child not found' });
    }

    const childAge = childResults[0].age;
    const medicalCondition = childResults[0].medicalConditions;

    db.query('SELECT * FROM milestones WHERE min_age <= ? AND max_age >= ? AND medical_condition = ?', [childAge, childAge, medicalCondition], (err, milestoneResults) => {
      if (err) {
        console.error('Database error (milestones):', err);
        return res.status(500).json({ error: 'Database error' });
      }

      res.json(milestoneResults);
    });
  });
});













