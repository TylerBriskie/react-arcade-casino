import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// LOCAL IMPORTS
import NavBar from './components/common/NavBar';
import Home from './components/common/Home';
import Login from './components/common/Login';
import Signup from './components/common/Signup';

import './App.css';


function App() {

  const ActiveUserContext = React.createContext({id: 0, display_name: "Guest", credits: 0});

  return (
    <div className="App">

      <NavBar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
