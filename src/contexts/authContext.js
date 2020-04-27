import React, { Component, createContext } from 'react';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = { 
    isAuthenticated: false,
    token: null
  }

  setAuthenticated = (state) => {
    this.setState({
      ...state
    });
  }

  render() { 
    return ( 
      <AuthContext.Provider value={{...this.state, setAuthenticated: this.setAuthenticated}}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
 
export default AuthContextProvider;