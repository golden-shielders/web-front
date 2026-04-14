import { useEffect, useState } from "react";
import { clearAccessToken, getMyInfo } from "../api/auth";
import type { User } from "../api/types";

interface UseAuthResult {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export default function useAuth(): UseAuthResult {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    async function fetchMe() {
      try {
        const data = await getMyInfo();

        if (!mounted) return;

        setUser(data);
        setIsAuthenticated(true);
      } catch {
        clearAccessToken();

        if (!mounted) return;

        setUser(null);
        setIsAuthenticated(false);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchMe();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
  };
}
