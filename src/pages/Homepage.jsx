import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalState } from '../App';
import Checked from '../Hooks/updateTodoStatus';
import Axios from 'axios';
import TextInput from '../components/TextInput/TextInput';
import './Homepage.css';
import TodoInList from '../components/TodoInList/TodoInList';

export const Homepage = () => {
  const history = useHistory();
  const globalState = useGlobalState();
  const userData = globalState.userData;
  // const setUserData = globalState.setUserData;
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user_id = userData[0].Id;
      const getAllSavedLists = await Axios.post('http://localhost:3001/getAllSavedLists', {
        user_id,
      });
      const listsData = getAllSavedLists.data;
      const listsId = listsData.map((item) => {
        return item.list_id;
      });
      const distinctListsId = [...new Set(listsId)];
      // console.log(distinctListsId);
      const newLists = distinctListsId.map((id) => {
        const array = [];
        listsData.filter((obj) => {
          if (obj.list_id === id) {
            array.push(obj);
          } else {
            return false;
          }
        });
        return {
          list_id: id,
          data: array,
        };
      });
      setLists(newLists);
    };
    fetchData();
  }, []);

  const onSubmit = (event) => {
    //Front end part
    event.preventDefault();
    const formData = new FormData(event.target);
    const userInput = formData.get('add');
    const inputField = document.getElementById('task-input');

    const newTodo = {
      user_id: userData[0].Id,
      todo: userInput,
      IsCompleted: 'F',
    };
    console.log(newTodo);
    if (userInput === '') {
      return;
    } else {
      const postData = async () => {
        try {
          await Axios.post('http://localhost:3001/addTodo', {
            todo: newTodo.todo,
            IsCompleted: newTodo.IsCompleted,
            user_id: newTodo.user_id,
          }).then(async () => {
            const getTodo = await Axios.get(`http://localhost:3001/getTodo/`);
            const data = getTodo.data;
            // console.log(data);
            setTasks([...tasks].concat(data));
            inputField.value = '';
          });
        } catch (error) {
          console.log(error);
        }
      };
      postData();
    }
  };

  const deleteTodo = (id) => {
    // BackEnd part
    Axios.delete(`http://localhost:3001/deleteTodo/${id}`, { id }).then(() => {
      const updatedTodos = tasks.filter((todo) => {
        // console.log(`todo in deleteTodo`, todo);
        // console.log(todo.todo_id, id);
        return todo.todo_id !== id;
      });

      setTasks(updatedTodos);
      // console.log('Deleted todo with id', id);
    });
  };

  const saveToDosToList = async () => {
    const newList = [tasks];
    console.log(tasks);
    setLists([...lists].concat(newList));
    setTasks([]);
    const user_id = userData[0].Id;
    // console.log('user_id is ', user_id);
    try {
      await Axios.post('http://localhost:3001/postList/', { user_id });
      const getLastList = await Axios.get('http://localhost:3001/getLastList/');
      const lastListId = getLastList.data[0].list_id;
      // console.log(`Last list id is`, lastListId);

      tasks.map(async (item) => {
        const object = {
          todo_id: item.todo_id,
          list_id: lastListId,
        };
        // console.log(`todo_id is ${item.todo_id} list_id is ${lastListId}`);
        // console.log(`object is`, object);
        await Axios.post('http://localhost:3001/addToList', { object });
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteList = async (e) => {
    const list_id = e.target.parentElement.id;
    console.log(list_id);
    try {
      await Axios.delete(`http://localhost:3001/deleteList/${list_id}`).then(() => {
        const updatedLists = lists.filter((list) => {
          return list.list_id.toString() !== list_id;
        });
        setLists(updatedLists);
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log('tasksLength outside ', tasksLength);
  // console.log(`tasks`, tasks);

  // console.log('userData is', userData);
  // console.log(lists);

  if (!userData) {
    return (
      <>
        <div>You shouldn't be here ^_^</div>
        <button onClick={() => history.push('/login')}>go to login</button>
      </>
    );
  }
  return (
    <>
      <div>{`Hello, ${userData[0].username}`}</div>
      <TextInput onSubmit={onSubmit} />
      {tasks.length > 0 ? (
        <div>
          {tasks?.map((item, index) => {
            // console.log(item);
            return (
              <div className="todo-item" key={index}>
                <h2>{item.todo}</h2>
                <button onClick={() => deleteTodo(item.todo_id)}>delete</button>
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
          ? lists.map((list, index) => {
              console.log(list);
              const list_id = list.list_id;
              return (
                <div key={list_id} id={list_id} className="todo-list">
                  {list.data.map((todo, index) => {
                    // console.log(todo);
                    return (
                      <TodoInList
                        todoId={todo.todo_id}
                        todoText={todo.todo}
                        listId={todo.list_id}
                      />
                    );
                  })}
                  <button className="list-delete-button" onClick={(e) => deleteList(e)}>
                    X
                  </button>
                </div>
              );
            })
          : false}
      </div>
    </>
  );
};
export default Homepage;
