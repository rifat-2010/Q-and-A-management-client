import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Check expiry
                if (decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setUser(null);
                } else {
                    // ideally verify with backend, but for now just trust token + localStorage user
                    const storedUser = JSON.parse(localStorage.getItem("user"));
                    setUser(storedUser);
                }
            } catch (error) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password,
            });

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                // Store minimal user info
                const userData = {
                    id: res.data._id,
                    name: res.data.name,
                    email: res.data.email,
                    role: res.data.role
                };
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            }
            return res.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    };

    const register = async (name, email, password, role) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/register`, {
                name,
                email,
                password,
                role, // Optional, defaults to user
            });

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                const userData = {
                    id: res.data._id,
                    name: res.data.name,
                    email: res.data.email,
                    role: res.data.role
                };
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            }
            return res.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
