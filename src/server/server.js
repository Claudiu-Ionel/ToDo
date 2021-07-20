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
  db.query('SELECT Id, username from users WHERE username = ? AND password = ?;', [username, password],
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
  const user_id = req.body.user_id;

  db.query('INSERT INTO todos(user_id, todo, IsComplete ) VALUES(?,?,?);', [user_id, todo, IsCompleted],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Values Inserted');
      }
    })
})
app.get('/getTodo/', (req, res) => {
  db.query('SELECT todo_id, todo, IsComplete FROM todos ORDER BY todo_id DESC LIMIT 1',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result)
        res.send(result);
      }
    })
})
app.delete('/deleteTodo/:id', (req, res) => {
  const id = req.params.id

  db.query('DELETE FROM todos WHERE todos.todo_id = ?', id,
    (err, result) => {
      if (err) {
        console.log(err);
        console.log(id);
      } else {
        res.send('deleted todo');
      }
    })
})

app.post('/postList', (req, res) => {
  const user_id = req.body.user_id;
  console.log(user_id);
  db.query('INSERT INTO lists(user_id) VALUES(?);', user_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(`added list for user ${user_id}`);
    }
  })

})
app.get('/getLastList', (req, res) => {
  db.query('SELECT list_id from lists ORDER BY list_id DESC LIMIT 1', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})
app.post('/addToList', (req, res) => {
  const object = req.body.object
  db.query('INSERT INTO todo_in_list(todo_id, list_id) VALUES(?, ?)', [object.todo_id, object.list_id], (err, result) => {
    if (err) {
      console.log(err);

    } else {
      res.send(`added to list ${object.list_id}`)
    }
  })

})

app.post('/getAllSavedLists', (req, res) => {
  const user_id = req.body.user_id
  console.log('user_id is', user_id);
  db.query('SELECT  tl.todo_id, t.todo , tl.list_id From todo_in_list tl INNER JOIN todos t ON t.todo_id = tl.todo_id where user_id = ?', user_id, (err, result) => {
    if (err) {

      console.log(err);
    } else {
      res.send(result)
    }
  })
})

app.patch('/updateTodoStatus', (req, res) => {
  const todo_id = req.body.todo_id;
  const todo_status = req.body.todo_status;
  console.log(todo_status);
  db.query('UPDATE todos t SET t.IsComplete = ? WHERE t.todo_id = ?;', [todo_status, todo_id], (err, result) => {
    if (err) {
      console.log(err);

    } else {
      console.log(`todo #${todo_id} IsComplete: ${todo_status}`);
    }
  })
  res.end();
})

app.delete('/deleteList/:list_id', (req, res) => {
  const list_id = req.params.list_id;
  console.log(list_id);
  db.query('DELETE from lists WHERE lists.list_id = ?;', list_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`list with id : ${list_id} has been deleted`);
    }
  })
  res.end();
})
app.listen(3001)