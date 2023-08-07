import { createContext } from 'react';

export const LoadContext = createContext({
    loading: true,
    setLoading: () => {}
});