import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home/Home';
import UploadScreen from './components/UploadScreen/UploadScreen';
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
    <div className="App">
      {user ? <UploadScreen /> : <Home />}
    </div>
  );
}

export default App;