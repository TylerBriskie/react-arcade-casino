import React from 'react';
import { Route, Switch } from 'react-router-dom';

// LOCAL IMPORTS
import NavBar from './components/common/NavBar';
import Home from './components/common/Home';
import Login from './components/common/Login';
import Signup from './components/common/Signup';
import './App.css';
import ThemeContextProvider from './contexts/themeContext';
import AuthContextProvider from './contexts/authContext';
import AccountSettings from './components/common/AccountSettings';
import CasinoHome from './components/casino/CasinoHome';
import ArcadeHome from './components/arcade/ArcadeHome';
 
// MAIN APP
function App() {

  return (
    // <ThemeContextProvider>
      <div className="App">
        <ThemeContextProvider>
          <AuthContextProvider>
            <NavBar />
            <Switch>

              <Route path="/" component={Home} exact />
              <Route path="/account" component={AccountSettings} />
              <Route path="/casino" component={ CasinoHome } />
              <Route path="/arcade" component={ ArcadeHome } />

              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
          </AuthContextProvider>
        </ThemeContextProvider>

      </div>
    // </ThemeContextProvider>


  );
}

export default App;
