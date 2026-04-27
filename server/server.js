const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
console.log("ENV:", process.env.DB_HOST);
// DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true
  }
});

// 🔥 IMPORTANT: Check connection
db.connect((err) => {
  if (err) {
    console.error("DB connection failed ❌:", err);
  } else {
    console.log("Connected to DB ✅");
  }
});

// Create task
app.post("/add", (req, res) => {
  const { task } = req.body;
  db.query("INSERT INTO tasks (task) VALUES (?)", [task], (err) => {
    if (err) return res.send(err);
    res.send("Task added");
  });
});

// Get tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));