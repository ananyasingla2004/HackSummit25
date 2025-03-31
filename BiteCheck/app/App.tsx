import { Switch, Route } from "wouter";
import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/(tabs)/not-found";
import Home from "@/(tabs)/home";
import Dashboard from "@/(tabs)/dashboard";
import Scan from "@/(tabs)/scan";
import ProductDetails from "@/(tabs)/product-details";
import HealthTracker from "@/(tabs)/health-tracker";
import Leaderboard from "@/(tabs)/leaderboard";
import Notifications from "@/(tabs)/notifications";
import { AppProvider } from "@/lib/context/app-context";
import { ThemeProvider, useThemeContext } from "@/lib/context/theme-context";
import BottomNavigation from "@/components/layout/bottom-navigation";
import AppHeader from "@/components/layout/app-header";
import { Profile } from "@/(tabs)/profile";

// ThemeScriptLoader component to dynamically load theme script
function ThemeScriptLoader() {
  const { isDarkMode, themeVars } = useThemeContext();
  
  useEffect(() => {
    const themeScriptId = 'dynamic-theme-script';
    
    // Remove existing script if it exists
    const existingScript = document.getElementById(themeScriptId);
    if (existingScript) {
      existingScript.remove();
    }
    
    // Create and append new script element
    const script = document.createElement('script');
    script.id = themeScriptId;
    script.src = `/theme-script.js?mode=${isDarkMode ? 'dark' : 'light'}&primary=${encodeURIComponent(themeVars.primary)}`;
    
    document.head.appendChild(script);
    
    return () => {
      const scriptToRemove = document.getElementById(themeScriptId);
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [isDarkMode, themeVars.primary]);
  
  return null;
}

function Router() {
  const [showHeader, setShowHeader] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);

  return (
    <ThemeProvider>
      <ThemeScriptLoader />
      <AppProvider>
        <div className="max-w-md mx-auto h-screen flex flex-col overflow-hidden relative bg-background">
          {showHeader && <AppHeader />}

          <main className="flex-1 overflow-y-auto pb-16 relative">
            <Switch>
              <Route path="/" component={() => {
                useEffect(() => {
                  setShowHeader(false);
                  setShowNavigation(false);
                }, []);
                return <Home onGetStarted={() => {
                  setShowHeader(true);
                  setShowNavigation(true);
                }} />;
              }} />
              <Route path="/dashboard" component={() => {
                useEffect(() => {
                  setShowHeader(true);
                  setShowNavigation(true);
                }, []);
                return <Dashboard />;
              }} />
              <Route path="/scan" component={() => {
                useEffect(() => {
                  setShowHeader(true);
                  setShowNavigation(true);
                }, []);
                return <Scan />;
              }} />
              <Route path="/product/:id" component={() => {
                useEffect(() => {
                  setShowHeader(true);
                  setShowNavigation(true);
                }, []);
                return <ProductDetails />;
              }} />
              <Route path="/health" component={() => {
                useEffect(() => {
                  setShowHeader(true);
                  setShowNavigation(true);
                }, []);
                return <HealthTracker />;
              }} />
              <Route path="/leaderboard" component={() => {
                useEffect(() => {
                  setShowHeader(true);
                  setShowNavigation(true);
                }, []);
                return <Leaderboard />;
              }} />
              <Route path="/profile" component={() => {
                useEffect(() => {
                  setShowHeader(true);
                  setShowNavigation(true);
                }, []);
                return <Profile />;
              }} />
              <Route path="/notifications" component={() => {
                useEffect(() => {
                  setShowHeader(true);
                  setShowNavigation(true);
                }, []);
                return <Notifications />;
              }} />
              <Route component={NotFound} />
            </Switch>
          </main>

          {showNavigation && <BottomNavigation />}
        </div>
      </AppProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;