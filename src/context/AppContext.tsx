import { useDisclosure } from "@chakra-ui/hooks";
import { createContext, useEffect, useReducer } from "react";
import {
    AppContextI as AppContextIType,
    AppContextState,
    UserProfileType,
} from "../constants/interfaces";
import { appReducer } from "../reducers/appReducer";

const initialAppState: AppContextState = {
    loggedUserProfile: undefined,
    disclosure: {
        getButtonProps: () => null,
        getDisclosureProps: () => null,
        isControlled: false,
        isOpen: false,
        onClose: () => null,
        onOpen: () => null,
        onToggle: () => null,
    },
};

export const AppContextI = createContext<AppContextIType>({
    ...initialAppState,
    setUserProfile: () => null,
});

export const AppContext: React.FC<{}> = ({ children }) => {
    const intialState: AppContextState = initialAppState;
    const context = useReducer(appReducer, intialState);

    const disclosure = useDisclosure();

    const [state, dispatch] = context;

    const setUserProfile = (profile: UserProfileType) => {
        dispatch({ type: "user-profile", profile });
    };

    useEffect(() => {
        dispatch({ type: "set-disclosure", disclosure });
        // eslint-disable-next-line
    }, [JSON.stringify(disclosure)]);

    return (
        <AppContextI.Provider value={{ ...state, setUserProfile }}>
            {children}
        </AppContextI.Provider>
    );
};
