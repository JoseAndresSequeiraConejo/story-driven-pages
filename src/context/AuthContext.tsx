import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

interface User {
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string): boolean => {
    // Demo: admin@incluyete.com logs in as admin
    if (email === "admin@incluyete.com") {
      setUser({ name: "Administrador", email, role: "admin" });
    } else {
      setUser({ name: email.split("@")[0], email, role: "user" });
    }
    toast.success("Sesión iniciada correctamente");
    return true;
  };

  const register = (name: string, email: string, _password: string): boolean => {
    setUser({ name, email, role: "user" });
    toast.success("Cuenta creada exitosamente");
    return true;
  };

  const logout = () => {
    setUser(null);
    toast.info("Sesión cerrada");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
