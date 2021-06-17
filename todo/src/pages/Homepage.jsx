import { useState } from 'react';
import Axios from 'axios';
import TextInput from '../components/TextInput/TextInput';
import './Homepage.css';

export const Homepage = () => {
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [tasksLength, setTasksLength] = useState(0);
  const onSubmit = (event) => {
    //Front end part
    event.preventDefault();
    const formData = new FormData(event.target);
    const userInput = formData.get('add');
    const inputField = document.getElementById('task-input');

    const newTodo = {
      todo: userInput,
      IsCompleted: 'F',
    };

    if (userInput === '') {
      return;
    } else {
      const postData = async () => {
        try {
          await Axios.post('http://localhost:3001/addTodo', {
            todo: newTodo.todo,
            IsCompleted: newTodo.IsCompleted,
          }).then(() => {
            console.log('POSTED');
          });
          console.log('tasksLength in postData()', tasksLength);
          setTasksLength(tasksLength + 1);
        } catch (error) {
          console.log(error);
        }
      };
      postData();
    }
    // BackEnd part

    // console.log(newTodo.text);
    // Axios.post('http://localhost:3001/addTodo', {
    //   text: newTodo.text,
    //   completed: newTodo.completed,
    // }).then(() => console.log('POSTED'));

    const getData = async (limit) => {
      try {
        limit = 1;
        const getTodo = await Axios.get(`http://localhost:3001/getTodo/${limit}`, { limit });
        const data = getTodo.data;
        console.log(data);
        setTasks([...tasks].concat(data));

        // setTasks(getTodo.data);
        inputField.value = '';
      } catch (error) {
        console.log(error);
      }
      console.log('tasksLength inside getData()', tasksLength);
    };
    getData();
  };

  const deleteTodo = (id) => {
    // BackEnd part
    Axios.delete(`http://localhost:3001/deleteTodo/${id}`, { id }).then(() => {
      const updatedTodos = tasks.filter((todo) => {
        console.log(todo);
        console.log(todo.Id, id);
        return todo.Id !== id;
      });

      setTasks(updatedTodos);
      setTasksLength(tasksLength - 1);
      console.log('Deleted todo with id', id);
    });
  };

  const saveToDosToList = () => {
    const newList = [tasks];
    setLists([...lists].concat(newList));
    setTasks([]);
  };
  console.log('tasksLength outside ', tasksLength);
  console.log(tasks);
  return (
    <>
      <TextInput onSubmit={onSubmit} />

      {tasks.length > 0 ? (
        <div>
          {tasks.map((item, index) => {
            console.log(item);
            return (
              <div className="todo-item" key={index}>
                <h2>{item.todo}</h2>
                <button onClick={() => deleteTodo(item.Id)}>delete</button>
              </div>
            );
          })}
          <button onClick={() => saveToDosToList()}>Save List</button>
        </div>
      ) : (
        <div>No tasks</div>
      )}
      <div className="lists">
        {lists.length > 0
          ? lists.map((list) => {
              console.log(list);
              return (
                <div>
                  {list.map((todo, index) => {
                    return (
                      <div key={index} className="todo">
                        <h2>{todo.todo}</h2>
                        <input className="checkbox" type="checkbox"></input>
                      </div>
                    );
                  })}
                </div>
              );
            })
          : console.log('no lists')}
      </div>
    </>
  );
};
export default Homepage;
