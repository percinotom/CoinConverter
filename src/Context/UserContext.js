import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: 0,
    nome: "",
    login: "",
    senha: "",
    logado: false,
  });

  const loginContext = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser({
      id: 0,
      nome: "",
      login: "",
      senha: "",
      logado: false,
    });
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function UseUser() {
  const context = useContext(UserContext);
  const { user, loginContext, logout } = context;
  return { user, loginContext, logout };
}