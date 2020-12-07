import React, { useReducer } from "react";
import { AuthContext } from "../context1";
import { appContext } from "../lib/createNewContext";
import reducer from "./reducer";

interface AuthSProps {}

interface ActionTypeI {
    payload?: any
}

type ReducerFunction<T> = (state: T, action: any) => T;

const AuthS: React.FC<AuthSProps> = ({ children }) => {
  const [state, dispatch] = useReducer<
    ReducerFunction<AuthContext>,
    AuthContext
  >(reducer, appContext[0].initialState, () => ({
    ...appContext[0].initialState,
  }));
  const Provider = appContext[0].context.Provider;

  function betterDispatcher<Y>(dispatchFunction: React.Dispatch<Y>) {
    
  }

  const unAuth = () => {
    dispatch({ type: "UNAUTH" });
  };

  return (
    <Provider value={{ isAuthenticated: state.isAuthenticated, unAuth }}>
      {children}
    </Provider>
  );
};
export default AuthS;
