export default (state: any, action: any) => {
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
