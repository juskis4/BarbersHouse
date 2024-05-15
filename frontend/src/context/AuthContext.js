import React, { createContext, useState } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    login: (user) => {},
    logout: () => {}
});

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = (user) => {
        setIsAuthenticated(true);
        setUser("Admin");
        // update isAuthenticated, setUser
    };

    const logout = () => {
        // reset isAuthenticated, setUser
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
