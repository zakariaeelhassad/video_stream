import { createContext, useState } from 'react';
import { authService } from '../services/auth';


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => authService.getCurrentUser());
    const [loading] = useState(false);

    const login = async (email, password) => {
        const loggedUser = await authService.login(email, password);
        setUser(loggedUser);
        return loggedUser;
    };

    const register = async (userData) => {
        const newUser = await authService.register(userData);
        setUser(newUser);
        return newUser;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
