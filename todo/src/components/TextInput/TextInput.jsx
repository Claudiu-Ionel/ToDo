import PropTypes from 'prop-types';
import './TextInput.css';
const TextInput = ({ onSubmit }) => {
  return (
    <form className="input-bar-wrapper" onSubmit={onSubmit}>
      <div className="input-area">
        <label className="input-label" htmlFor="task-input">
          Task:
        </label>
        <input type="text" id="task-input" autoComplete="off" name="add" />
        <button id="add-button" type="submit">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TextInput;

TextInput.propTypes = {
  onSubmit: PropTypes.func,
};
