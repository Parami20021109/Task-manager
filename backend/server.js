const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // JSON data handle කරන්න

// MongoDB Atlas Connection
const mongoURI = process.env.MONGO_URI;


mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Atlas connected successfully!"))
    .catch(err => console.log("❌ Database connection error:", err));

// Simple Route එකක් (Test කරන්න)
app.get('/', (req, res) => {
    res.send("Server is running...");
});

// Server එක Start කිරීම
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
});