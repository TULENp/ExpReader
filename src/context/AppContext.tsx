import { createContext } from 'react';

type AppContextType = {
    // isAuthorized: boolean | null;
    setIsAuthorized: (b: boolean) => void;
};

export const AppContext = createContext<AppContextType>({
    // isAuthorized: null,
    setIsAuthorized: () => { },
});