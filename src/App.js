import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// LOCAL IMPORTS
import Theme from './Themes';
import NavBar from './components/common/NavBar';
import Home from './components/common/Home';
import Login from './components/common/Login';
import Signup from './components/common/Signup';
import './App.css';
import AuthContextProvider from './contexts/authContext';
import AccountSettings from './components/common/AccountSettings';
import CasinoHome from './components/casino/CasinoHome';
import ArcadeHome from './components/arcade/ArcadeHome';
import BlackJack from './components/casino/blackjack/BlackJack';
 
// MAIN APP
function App() {

  const theme = createMuiTheme(Theme)


  return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Paper className="App" style={{height: "100vh"}}>

            <AuthContextProvider>
              <NavBar />
              <Switch>
                
                <Route path="/" component={Home} exact />
                <Route path="/account" component={AccountSettings} />
                <Route path="/arcade" component={ ArcadeHome } />
                <Route
                  path="/casino"
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}/`} component={CasinoHome} exact />
                      <Route path={`${url}/blackjack`} component={BlackJack} />
                    </>
                  )}
                />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
              </Switch>
            </AuthContextProvider>
          </Paper>

        </ThemeProvider>



  );
}

export default App;
