const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Import your routes
const taskRoutes = require('./routes/taskRoute');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Essential for parsing the body of POST/PATCH requests

// MongoDB Atlas Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Atlas connected successfully!"))
    .catch(err => console.log("❌ Database connection error:", err));

// 2. Use your routes
// All task-related URLs will now start with /api/tasks
app.use('/api/tasks', taskRoutes);

// Simple Route for testing
app.get('/', (req, res) => {
    res.send("TaskMaster Server is running...");
});

// Server Start
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
});