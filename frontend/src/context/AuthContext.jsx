import { createContext, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    return (
        <AuthContext.Provider value={{
            user, setUser,
            loading, setLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext };
export default AuthProvider; 