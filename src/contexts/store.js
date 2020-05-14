// store.js
import React, { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();
const initialState = {
    count: 0, 
    message: "",
    isAuthenticated: false,
    token: '',
    id: '',
    username: '',
    credits: 0,

};

const reducer = (state, action) => {


    console.log(state)
  switch(action.type) {

    case "USER_LOGIN": 
        console.log('login action');
        return {
            isAuthenticated: true,
            username: action.username,
            credits: action.credits,
            token: action.token,
        }
    case "USER_LOGOUT":
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