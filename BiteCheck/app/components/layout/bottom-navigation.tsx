import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  path: string;
  icon: string;
}

export function BottomNavigation() {
  const [location] = useLocation();
  
  const navItems: NavItem[] = [
    { name: "Home", path: "/dashboard", icon: "fas fa-home" },
    { name: "Scan", path: "/scan", icon: "fas fa-qrcode" },
    { name: "Health", path: "/health", icon: "fas fa-chart-line" },
    { name: "Compete", path: "/leaderboard", icon: "fas fa-trophy" },
    { name: "Profile", path: "/profile", icon: "fas fa-user" }
  ];
  
  // Function to check if a nav item is active based on the current location
  const isActive = (path: string): boolean => {
    if (path === "/dashboard" && location === "/") return true;
    return location === path || location.startsWith(`${path}/`);
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 px-4 py-2">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "flex flex-col items-center py-1 px-3 transition-colors duration-200",
              isActive(item.path)
                ? "text-primary"
                : "text-gray-500 dark:text-gray-400"
            )}
          >
            <i className={cn(item.icon, "text-xl mb-1")} />
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default BottomNavigation;