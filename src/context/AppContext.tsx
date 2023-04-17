import { NetInfoState } from '@react-native-community/netinfo';
import { createContext } from 'react';

type AppContextType = {
    // isAuthorized: boolean | null;
    netInfo: NetInfoState | null;
    setIsAuthorized: (b: boolean) => void;
    isGotBackend: boolean,
    setIsGotBackend: (b: boolean) => void;
};

export const AppContext = createContext<AppContextType>({
    // isAuthorized: null,
    netInfo: null,
    setIsAuthorized: () => { },
    isGotBackend: false,
    setIsGotBackend: () => { },
});