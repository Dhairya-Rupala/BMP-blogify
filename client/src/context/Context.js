import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
import { useContext } from "react";

// defining the initial state 
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

// creating the context for the initial state
export const Context = createContext(INITIAL_STATE);

// creating a context provider 
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);


  // creating the context provider which will render the 
  // children inside it, which can access the user data and the 
  // flags 
  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useGlobalContext = ()=>{
    return useContext(Context);
}
export default useGlobalContext;
