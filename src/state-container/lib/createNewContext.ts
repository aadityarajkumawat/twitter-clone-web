import { createContext } from "react";

interface CreateContextParamsI<T> {
  initialState: T;
  contextName: string;
}

interface AppContextI<T> {
  context: React.Context<T>;
  contextName: string;
  initialState: T;
}

export const appContext: Array<AppContextI<any>> = [];

export function createNewContext<T>(contextParams: CreateContextParamsI<T>) {
  const newContext = createContext(contextParams.initialState);
  appContext.push({
    context: newContext,
    contextName: contextParams.contextName,
    initialState: contextParams.initialState,
  });
}

console.log(appContext);
