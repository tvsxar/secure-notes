import { createContext, useState, useEffect } from "react";
import api from '../utilities/axios';

const AuthContext = createContext(null);

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Auth functions
    useEffect(() => {
        async function fetchUser() {
            try {
                setLoading(true);
                const response = await api.get('/auth/me');
                setUser(response.data);
            } catch (error) {
                setUser(null);
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [])

    async function handlePostQuery(type, userData) {
        const isLogin = type === 'login';

        try {
            setLoading(true);
            const response = await api.post(isLogin ? '/auth/login' : '/auth/register', userData);

            if (!user) {
                setError(isLogin ? "Invalid email or password" : "Registration failed");
                return;
            }

            const { user } = response.data;

            // Set user & navigate to notes
            setUser(user);

            return true;
        } catch (error) {
            console.error(error);
            setError("Something went wrong, please try again.");
            return false;
        } finally {
            setLoading(false);
        }
    }

    async function handleLogout() {
        try {
            const response = await api.post('/auth/logout')
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AuthContext.Provider value={{
            user, setUser,
            loading, setLoading,
            error, setError,
            handlePostQuery, handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext };
export default AuthProvider; 