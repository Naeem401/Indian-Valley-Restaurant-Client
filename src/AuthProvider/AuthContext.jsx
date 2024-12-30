import React, { createContext, useContext, useState } from "react";

// Create Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   

    // Language state
    const [language, setLanguage] = useState("en"); // Default language is English

    // Toggle language between English and Arabic
    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === "en" ? "ar" : "en"));
    };

    // Provide values to context consumers
    return (
        <AuthContext.Provider
            value={{
                language,
                toggleLanguage,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
