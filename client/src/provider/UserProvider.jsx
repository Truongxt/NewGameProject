import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
          }
        })
        .catch((err) => {
          console.error("Lỗi khi khôi phục trạng thái người dùng:", err);
        });
    }
  }, []);

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

  const userContextValue = useMemo(
    () => ({
      user,
      setUser,
      getFirstName,
      formatDate,
    }),
    [user, setUser, getFirstName, formatDate]
  );

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
