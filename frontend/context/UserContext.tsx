"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  username: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded: any = jwtDecode(token);
    setUser({
      id: decoded.sub,
      username: decoded.username,
      email: decoded.email,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      if (token) login(token);
    } catch (err: any) {
      console.error("Invalid Token", err);
      logout();
    }
  }, []);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
