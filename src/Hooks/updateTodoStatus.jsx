import Axios from 'axios';

const Checked = async (e) => {
  const parentId = e.target.parentElement.id;
  const status = e.target.checked.toString();
  console.log(status[0].toUpperCase());
  console.log(`todo with id: ${parentId} is checked: ${status}`);

  await Axios.patch('http://localhost:3001/updateTodoStatus/', {
    todo_id: parentId,
    todo_status: status[0].toUpperCase(),
  });
};
export default Checked;
