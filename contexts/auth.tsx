import React, { useState, useEffect, useContext, createContext } from 'react';

interface ContextType {
    isAuth: boolean;
    logUser: Object;
    setAuth: Function;
    //children: React.ReactChild | React.ReactChild[]
}

const AuthContext = createContext<ContextType | null>(null);



const AuthProvider: React.FC = ({ children }) => {

    const [isAuth, setAuth] = useState<boolean>(false);
    const [logUser, setLogUser] = useState<Object>(null);

    return (
        <AuthContext.Provider value={{ isAuth, setAuth, logUser }} >
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };