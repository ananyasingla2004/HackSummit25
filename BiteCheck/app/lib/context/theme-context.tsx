import { createContext, useState, useEffect, ReactNode, useContext } from "react";

// Theme color values
const THEME_COLORS = {
  light: "hsl(54, 80%, 55%)", // Yellowish color for light mode
  dark: "hsl(122, 39%, 49%)" // Green color for dark mode
};

// Theme variables for light/dark mode
const THEME_VARS = {
  light: {
    primary: THEME_COLORS.light,
    mode: "light"
  },
  dark: {
    primary: THEME_COLORS.dark,
    mode: "dark"
  }
};

interface ThemeContextProps {
  currentThemeColor: string;
  isDarkMode: boolean;
  themeVars: {
    primary: string;
    mode: string;
  };
}

// Create the context with default values
export const ThemeContext = createContext<ThemeContextProps>({
  currentThemeColor: THEME_COLORS.light,
  isDarkMode: false,
  themeVars: THEME_VARS.light,
});

// Custom hook to use the theme context
export const useThemeContext = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentThemeColor, setCurrentThemeColor] = useState(THEME_COLORS.light);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to load the theme script with proper parameters
  const loadThemeScript = (mode: 'light' | 'dark') => {
    const themeScriptId = 'dynamic-theme-script';
    
    // Remove existing script if it exists
    const existingScript = document.getElementById(themeScriptId);
    if (existingScript) {
      existingScript.remove();
    }
    
    // Create and append new script with appropriate parameters
    const script = document.createElement('script');
    script.id = themeScriptId;
    script.src = `/theme-script.js?mode=${mode}&primary=${encodeURIComponent(
      mode === 'dark' ? THEME_COLORS.dark : THEME_COLORS.light
    )}`;
    
    document.head.appendChild(script);
  };

  // Update theme color based on dark mode preference
  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Set state based on preference
    setIsDarkMode(prefersDark);
    setCurrentThemeColor(prefersDark ? THEME_COLORS.dark : THEME_COLORS.light);
    
    // Load initial theme script
    loadThemeScript(prefersDark ? 'dark' : 'light');
    
    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newMode = e.matches ? 'dark' : 'light';
      setIsDarkMode(e.matches);
      setCurrentThemeColor(e.matches ? THEME_COLORS.dark : THEME_COLORS.light);
      
      // Update theme script
      loadThemeScript(newMode);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider 
      value={{ 
        currentThemeColor, 
        isDarkMode, 
        themeVars: isDarkMode ? THEME_VARS.dark : THEME_VARS.light 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}