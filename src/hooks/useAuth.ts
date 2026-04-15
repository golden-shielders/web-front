// import { useEffect, useState } from "react";
// import { getValidUserFromToken } from "../api/auth";
// import type { User } from "../api/types";

// interface UseAuthResult {
//   user: User | null;
//   isLoading: boolean;
//   isAuthenticated: boolean;
// }

// export default function useAuth(): UseAuthResult {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const parsedUser = getValidUserFromToken();
//     setUser(parsedUser);
//     setIsLoading(false);
//   }, []);

//   return {
//     user,
//     isLoading,
//     isAuthenticated: user !== null,
//   };
// }

// export default function useAuth(): UseAuthResult {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   useEffect(() => {
//     let mounted = true;

//     async function fetchMe() {
//       try {
//         const data = await getMyInfo();
//         console.log(data)

//         if (!mounted) return;

//         setUser(data);
//         setIsAuthenticated(true);
//       } catch {
//         clearAccessToken();

//         if (!mounted) return;

//         setUser(null);
//         setIsAuthenticated(false);
//       } finally {
//         if (mounted) {
//           setIsLoading(false);
//         }
//       }
//     }

//     void fetchMe();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   return {
//     user,
//     isLoading,
//     isAuthenticated,
//   };
// }

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}