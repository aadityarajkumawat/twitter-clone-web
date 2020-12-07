declare namespace DispatchX {
  export type ActionTypes = { type: "UNAUTH" };
  export type ReducerFunction<T> = (state: T, action: ActionTypes) => T;
}
