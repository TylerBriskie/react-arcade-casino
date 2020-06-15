// store.js
import React, { createContext, useContext, useReducer } from 'react';


const jwt_decode = require('jwt-decode');

const StoreContext = createContext();
const token = localStorage.getItem('token');

let initialState;


if (token === null){
    initialState = {
        isAuthenticated: false,
        token: '',
        id: '',
        username: '',
        credits: 0,
        
    }
} else {
    const decoded = jwt_decode(token);
    initialState = {
        isAuthenticated: true,
        token,
        id: decoded.user_id,
        username: decoded.username,
        credits: decoded.credits
    }
    
    
}


const reducer = (state, action) => {
    
    switch(action.type) {
        
        case "USER_LOGIN": 
            console.log('log in user ' + action.username)
            localStorage.setItem('token', action.token);
            return {
                isAuthenticated: true,
                username: action.username,
                credits: action.credits,
                token: action.token,
            }
        case "USER_LOGOUT":
            console.log('logging out')
            localStorage.removeItem('token');
            return {
                isAuthenticated: false,

            }
        case "UPDATE_CREDITS": 
            return {
                credits: action.new_credits
            }
        case "UPDATE_WAGER": 
            return {
                credits: action.new_wager
            }
        default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext);