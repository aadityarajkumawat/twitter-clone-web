import React, { useReducer } from "react";
import { AuthContext } from "../context1";
import { appContext } from "../lib/createNewContext";
import reducer from "./reducer";
import { betterDispatcher } from "../lib/betterDispatcher";

interface AuthSProps {}

const AuthS: React.FC<AuthSProps> = ({ children }) => {
  const [state, dispatch] = useReducer<
    DispatchX.ReducerFunction<AuthContext>,
    AuthContext
  >(reducer, appContext[0].initialState, () => ({
    ...appContext[0].initialState,
  }));
  const Provider = appContext[0].context.Provider;

  const unAuth = () => {
    betterDispatcher<DispatchX.ActionTypes>(dispatch, { type: "UNAUTH" });
  };

  return (
    <Provider value={{ isAuthenticated: state.isAuthenticated, unAuth }}>
      {children}
    </Provider>
  );
};
export default AuthS;