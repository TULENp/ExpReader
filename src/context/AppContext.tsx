import { NetInfoState } from '@react-native-community/netinfo';
import { Dispatch, SetStateAction, createContext } from 'react';

type AppContextType = {
    // isAuthorized: boolean | null;
    netInfo: NetInfoState | null;
    setIsAuthorized: Dispatch<SetStateAction<boolean>>;
    isGotBackend: boolean,
    setIsGotBackend: Dispatch<SetStateAction<boolean>>;
    setIsAdmin: Dispatch<SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextType>({
    // isAuthorized: null,
    netInfo: null,
    setIsAuthorized: () => { },
    isGotBackend: false,
    setIsGotBackend: () => { },
    setIsAdmin: () => { },
});