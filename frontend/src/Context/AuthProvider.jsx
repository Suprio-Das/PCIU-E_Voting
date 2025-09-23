import { createContext, useState } from "react";
import api from "../Services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (credentials) => {
        const res = await api.post('/auth/login', credentials)
        if (res.data.success === true) {
            setUser(res.data.commissioner || { role: 'commissioner' })
        }
        return res
    }
    return (
        <AuthContext.Provider value={{ login, setUser }}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;