const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass@1085",
  database: "dam_db"
});
function logActivity(username, action, status, ip) {
  db.query(
    "INSERT INTO logs (username, action, status, ip_address) VALUES (?, ?, ?, ?)",
    [username, action, status, ip],
    (err) => {
      if (err) {
        console.log("Log error ❌", err);
      }
    }
  );
}

// REGISTER
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err) => {
      if (err) return res.send("Error ❌");
      res.send("User registered ✅");
    }
  );
});

// LOGIN (PLAIN PASSWORD VERSION)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    req.ip;

  // Step 1: check user
  db.query("SELECT * FROM users WHERE username = ?", [username], (err, userResult) => {
    if (err || userResult.length === 0) {
      logActivity(username, "LOGIN", "FAILED - USER NOT FOUND", ip);
      return res.send("User not found ❌");
    }

    // Step 2: check attempts
    db.query("SELECT * FROM login_attempts WHERE username = ?", [username], (err, attemptResult) => {

      let attempts = attemptResult.length ? attemptResult[0].attempts : 0;
      let status = attemptResult.length ? attemptResult[0].status : "ACTIVE";

      // Step 3: check lock
      if (status === "LOCKED") {
        logActivity(username, "LOGIN", "BLOCKED - ACCOUNT LOCKED", ip);
        return res.send("Account locked 🚨");
      }

      // Step 4: password check (plain version)
      if (userResult[0].password !== password) {

        attempts++;

        if (attempts >= 3) {
          db.query(
            "REPLACE INTO login_attempts (username, attempts, status) VALUES (?, ?, 'LOCKED')",
            [username, attempts]
          );

          logActivity(username, "LOGIN", "LOCKED AFTER FAILED ATTEMPTS", ip);
          return res.send("Account locked after 3 attempts 🚨");
        }

        db.query(
          "REPLACE INTO login_attempts (username, attempts) VALUES (?, ?)",
          [username, attempts]
        );

        logActivity(username, "LOGIN", "FAILED ATTEMPT " + attempts, ip);
        return res.send("Wrong password ❌");
      }

      // Step 5: success → reset attempts
      db.query("DELETE FROM login_attempts WHERE username = ?", [username]);

      logActivity(username, "LOGIN", "SUCCESS", ip);
      return res.send("Login successful ✅");
    });
  });
});
module.exports = router;