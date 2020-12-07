import { createNewContext } from "./lib/createNewContext";

export interface AuthContext {
  isAuthenticated: boolean;
}

export const contextA = {
  authContext: {
    context: createNewContext<AuthContext>({
      initialState: { isAuthenticated: false },
      contextName: "auth",
    }),
  },
};
