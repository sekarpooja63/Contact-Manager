import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactsRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/contactapp")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Server is running on port 5000!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));