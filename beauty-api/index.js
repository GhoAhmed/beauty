require("dotenv").config();
const express = require("express");
const app = express();
const pool = require("./config/db");

app.use(express.json());

// ✅ Check DB connection on startup
const checkDbConnection = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // stop the server if DB is unreachable
  }
};

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
  console.log(`Serveur is running on http://localhost:${PORT}`);
});
