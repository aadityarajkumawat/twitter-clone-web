import { createContext, useReducer } from "react";
import {
    AppContextI as AppContextIType,
    AppContextState,
    UserProfileType,
} from "../constants/interfaces";
import { appReducer } from "../reducers/appReducer";

const initialAppState: AppContextState = {
    loggedUserProfile: undefined,
};

export const AppContextI = createContext<AppContextIType>({
    ...initialAppState,
    setUserProfile: () => null,
});

export const AppContext: React.FC<{}> = ({ children }) => {
    const intialState: AppContextState = initialAppState;
    const context = useReducer(appReducer, intialState);
    const [state, dispatch] = context;

    const setUserProfile = (profile: UserProfileType) => {
        dispatch({ type: "user-profile", profile });
    };

    return (
        <AppContextI.Provider value={{ ...state, setUserProfile }}>
            {children}
        </AppContextI.Provider>
    );
};
