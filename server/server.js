const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Abhi@065",
  database: "tasksdb",
});

app.post("/add", (req, res) => {
  const { task } = req.body;
  db.query("INSERT INTO tasks (task) VALUES (?)", [task], (err) => {
    if (err) return res.send(err);
    res.send("Task added");
  });
});

app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));