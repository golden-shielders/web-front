import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clearAccessToken,
  getUserFromToken,
  getValidUserFromStorage,
  login as loginApi,
  saveAccessToken,
} from "../api/auth";
import type { User } from "../api/types";

interface LoginForm {
  username: string;
  password: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (form: LoginForm) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const parsedUser = getValidUserFromStorage();
    setUser(parsedUser);
    setIsLoading(false);
  }, []);

  async function login(form: LoginForm): Promise<void> {
    const data = await loginApi(form);

    saveAccessToken(data.accessToken);

    const parsedUser = getUserFromToken(data.accessToken);

    if (!parsedUser) {
      clearAccessToken();
      throw new Error("유효한 사용자 정보를 읽지 못했습니다.");
    }

    setUser(parsedUser);
  }

  function logout(): void {
    clearAccessToken();
    setUser(null);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
