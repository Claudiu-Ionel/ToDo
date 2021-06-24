import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import './App.css';
import Homepage from './pages/Homepage.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'

function App() {
  return (
    <div className="App">
      <Router basename="/todo">
        <Switch >
          <Route exact path="/register" component={Register}>
          </Route>
          <Route exact path="/login" component={Login} >
          </Route>
          <Route exact path="/homepage">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
