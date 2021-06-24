const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

var app = express();
app.use(cors());
app.use(express.json());

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'codeUntilTheEnd94!',
  database: 'todo',
})

db.connect((err) => {
  if (!err) {
    console.log('connected');
  } else {
    console.log('connection Failed');
  }

})

app.post('/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  db.query('INSERT INTO users (username, email, password) VALUES(?, ?, ?);', [username, email, password],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send('User registered');
      }
    })

})

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  db.query('SELECT user_id, username from users WHERE username = ? AND password = ?;', [username, password],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong Username/password combination" })
      }

    })
})

app.post('/addTodo', (req, res) => {
  const todo = req.body.todo;
  const IsCompleted = req.body.IsCompleted;

  db.query('INSERT INTO todos(todo, IsComplete) VALUES(?,?);', [todo, IsCompleted],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Values Inserted');
      }
    })
})
app.get('/getTodo/:limit', (req, res) => {
  const limit = parseInt(req.params.limit)
  db.query('SELECT Id, todo, IsComplete FROM todos ORDER BY Id DESC LIMIT ?', limit,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(limit);
        res.send(result);
      }
    })
})
app.delete('/deleteTodo/:id', (req, res) => {
  const id = req.params.id

  db.query('DELETE FROM todos WHERE todos.id = ?', id,
    (err, result) => {
      if (err) {
        console.log(err);
        console.log(id);
      } else {
        res.send('deleted todo');
      }
    })
})

app.listen(3001)