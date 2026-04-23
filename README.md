🔐 Database Activity Monitoring (DAM) System – SOC Dashboard

A full-stack security monitoring system that tracks user authentication activity in real time and visualizes it using a SOC-style dashboard. Built using Node.js, Express, MySQL, and Chart.js.

---

📌 Features

🔐 Authentication System
- User login validation
- Tracks login success and failure

📊 Database Activity Monitoring (DAM)
- Logs every login attempt
- Stores username, status, IP address, timestamp

🚨 SOC Dashboard (Security Monitoring)
- Real-time log monitoring
- Auto refresh every 5 seconds
- Threat detection for multiple failed logins
- Color-coded logs (Success / Failed)

📈 Analytics Dashboard
- Pie chart (Success vs Failed logins)
- Live statistics (Total / Success / Failed)

🔎 Advanced Features
- Search logs by username
- Filter logs (All / Success / Failed)
- Export logs as CSV file

---

🧰 Tech Stack

Node.js  
Express.js  
MySQL  
JavaScript  
HTML  
CSS  
Chart.js  
bcryptjs  

---

🚀 Getting Started

1. Clone the Repository

git clone https://github.com/Parinita-Teli/dam-system.git
cd dam-system

---

2. Install Dependencies

cd backend
npm install

---

3. Setup Database (MySQL)

CREATE DATABASE dam_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  password VARCHAR(255)
);

CREATE TABLE logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  action VARCHAR(50),
  status VARCHAR(100),
  ip_address VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---

4. Run Server

npm run dev

Server runs at:
http://localhost:5000

---

📁 Project Structure

dam-system/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── auth.js
│
├── frontend/
│   └── dashboard.html
│
└── README.md

---

🚨 Security Features

- Login attempt tracking
- Failed login detection
- Brute-force alert system
- IP logging
- Real-time monitoring dashboard

---

📊 Example Log Output

{
  "username": "janedoe",
  "action": "LOGIN",
  "status": "SUCCESS",
  "ip_address": "::1",
  "created_at": "2026-04-24"
}

---

🧠 Use Case

This system simulates a real-world SOC (Security Operations Center) used in:

- Banking systems
- Enterprise security
- Cloud infrastructure monitoring
- Cybersecurity auditing systems

---

🔮 Future Improvements

- JWT authentication
- Role-based access control (Admin/User)
- Email alerts for attacks
- Real-time WebSocket dashboard
- AI-based anomaly detection

---

👩‍💻 Author

Parinita Teli
