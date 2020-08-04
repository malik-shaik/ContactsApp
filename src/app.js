const express = require("express");
const connectDB = require("./database/connection");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

// Database Connection
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 4, // limit each IP to 4 requests per windowMs
});

app.use("/users/users/", authLimiter);
app.use("/users/contacts/", authLimiter);

// API outes
const userRoutes = require("./api/routes/userRoutes");
const contactRoutes = require("./api/routes/contactRoutes");

app.use("/api/users/", userRoutes);
app.use("/api/contacts/", contactRoutes);

module.exports = app;
