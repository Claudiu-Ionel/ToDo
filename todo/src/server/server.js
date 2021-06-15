const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

var app = express();
app.use(cors());
app.use(express.json())

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
app.get('/getTodo', (req, res) => {
  db.query('SELECT Id, todo, IsComplete FROM todos',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
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