import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import EmployeeFormPage from './components/EmployeeFormPage/EmployeeFormPage';
import FourOFourPage from './components/FourOFourPage/FourOFourPage';
import Home from './components/Home/Home';
import firebase from './Firebase';

const App = () => {
  const [user, setUser] = useState('');

  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  });

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/employee-form">
            <EmployeeFormPage user={user} />
          </Route>

          <Route path="*">
            <FourOFourPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;