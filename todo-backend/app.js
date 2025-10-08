// Core Module
const path = require('path');

// External Modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// MongoDB Connection
const DB_PATH = const DB_PATH = process.env.MONGO_URI;

// Local Modules
const todoItemsRouter = require("./routes/todoItemsRouter");
const errorsController = require("./controllers/errors");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use("/api/todo", todoItemsRouter);

// Error Controller
app.use(errorsController.pageNotFound);

// Port Setup
const PORT = process.env.PORT || 3000;

// Database Connection
mongoose.connect(DB_PATH)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error connecting to MongoDB:', err);
  });
