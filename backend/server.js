const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass@1085",
  database: "dam_db"
});

db.connect((err) => {
  if (err) {
    console.log("DB connection failed ❌");
  } else {
    console.log("Connected to MySQL ✅");
  }
});
const express = require("express");
const cors = require("cors");

const app = express();
app.set("trust proxy", true);
// Middleware
app.use(express.json());
app.use(cors());

// DB connection (just initialize)
require("./db");

// Routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Test routes
app.get("/", (req, res) => {
  res.send("HOME WORKING ✅");
});

app.get("/test", (req, res) => {
  res.send("TEST WORKING ✅");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});

app.get("/logs", (req, res) => {
  db.query("SELECT * FROM logs ORDER BY id DESC", (err, results) => {
    if (err) return res.send("Error fetching logs ❌");
    res.json(results);
  });
});