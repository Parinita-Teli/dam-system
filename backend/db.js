const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass@1085",
  database: "dam_db"
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB Connection Failed");
  } else {
    console.log("Connected to MySQL ✅");
  }
});

module.exports = db;