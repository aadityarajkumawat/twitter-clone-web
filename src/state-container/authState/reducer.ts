import { AuthContext } from "../context1";

const reducer: DispatchX.ReducerFunction<AuthContext> = (state, action) => {
  switch (action.type) {
    case "UNAUTH":
      return {
        ...state,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default reducer;