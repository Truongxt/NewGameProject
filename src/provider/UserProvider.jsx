import React, { createContext, useState, useContext, useMemo, useCallback, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const getFirstName = useCallback((fullName) => {
        if (!fullName) return "";
        const parts = fullName.trim().split(" ");
        return parts[parts.length - 1];
    }, []);

    const formatDate = (date) => {
        if (!date) return "";
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        };
        return new Intl.DateTimeFormat("vi-VN", options).format(new Date(date));
    };

    const userContextValue = useMemo(() => ({
        user,
        setUser,
        getFirstName,
        formatDate
    }), [user, setUser, getFirstName, formatDate]);

    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);