import Checked from '../../Hooks/updateTodoStatus';

const TodoInList = ({ todoId, todoText, listId }) => {
  return (
    <div className={listId}>
      <div id={todoId} className="todo">
        <h2>{todoText}</h2>
        <input
          className="checkbox"
          type="checkbox"
          onChange={(e) => {
            Checked(e);
          }}
        ></input>
      </div>
    </div>
  );
};

export default TodoInList;
