import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { useLocation } from "wouter";

interface User {
  id: number;
  username: string;
  name?: string;
  email?: string;
  avatar?: string;
  totalPoints?: number;
  palmOilAvoided?: number;
}

interface AppContextProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  userId: number | null;
  setUserId: (id: number | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create the context with default values
export const AppContext = createContext<AppContextProps>({
  currentPage: "Dashboard",
  setCurrentPage: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
  userId: null,
  setUserId: () => {},
  user: null,
  setUser: () => {},
});

// Custom hook to use the app context
export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [userId, setUserId] = useState<number | null>(1); // Default to user 1 for demo
  const [user, setUser] = useState<User | null>({
    id: 1,
    username: "john_doe",
    name: "John Doe",
    email: "john.doe@example.com",
    totalPoints: 360,
    palmOilAvoided: 480
  }); // Default sample user for demo
  const [location] = useLocation();

  // Update current page based on location
  useEffect(() => {
    const pageMappings: Record<string, string> = {
      "/dashboard": "Dashboard",
      "/scan": "Scan Product",
      "/health": "Health Tracker",
      "/leaderboard": "Leaderboard",
      "/profile": "My Profile",
      "/notifications": "Notifications",
    };

    // For paths like /product/:id
    if (location.startsWith("/product/")) {
      setCurrentPage("Product Details");
      return;
    }

    // Set page title based on current route
    const page = pageMappings[location] || "Dashboard";
    setCurrentPage(page);
  }, [location]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newValue = !prev;
      
      // Apply dark mode class to document
      if (newValue) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      return newValue;
    });
  };

  // Apply initial dark mode preference
  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (prefersDark) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        darkMode,
        toggleDarkMode,
        userId,
        setUserId,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
