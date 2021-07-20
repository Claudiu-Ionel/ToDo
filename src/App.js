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
import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();
export function useGlobalState() {
  const globalState = useContext(AppContext);
  return globalState;
}

function App() {
  const [userData, setUserData] = useState(null);
  const globalState = {
    userData,
    setUserData,
  }
  return (
    <div className="App">
      <AppContext.Provider value={globalState}>
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
      </AppContext.Provider>
    </div>
  );
}

export default App;
