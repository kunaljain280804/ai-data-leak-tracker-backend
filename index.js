require('dotenv').config();  // Load .env variables
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let usersCollection;  // Global variable

async function startServer() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas successfully');

    const db = client.db('aidataleaktracker');
    usersCollection = db.collection('users');

    // ---- Routes ----

    app.get('/', (req, res) => {
      res.send('Backend API is working!');
    });

    app.post('/api/check-leak', (req, res) => {
      const { email } = req.body;
      // Placeholder logic (we'll integrate AI later)
      const leaks = email.includes('test') ? ['Example Breach 2024'] : [];
      res.json({ email, leaks });
    });

    app.get('/api/report', (req, res) => {
      // Placeholder reports (we'll connect DB later)
      res.json([
        { id: 1, breach: 'Example Breach 2024', date: '2024-06-01' },
        { id: 2, breach: 'Another Breach', date: '2024-04-15' }
      ]);
    });

    // Start Express server AFTER DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}

startServer();
