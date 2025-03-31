import { useLocation } from "wouter";
import { useAppContext } from "@/lib/context/app-context";
import { Badge } from "@/components/ui/badge";

interface AppHeaderProps {
  title?: string;
}

export function AppHeader({ title }: AppHeaderProps) {
  const { currentPage } = useAppContext();
  const [, navigate] = useLocation();
  const pageTitle = title || currentPage;
  
  // In a real app, this would come from the backend notifications count
  const unreadNotificationsCount = 2;

  const goToNotifications = () => navigate("/notifications");
  const goToProfile = () => navigate("/profile");

  return (
    <header className="py-4 px-5 flex items-center justify-between border-b dark:border-gray-700">
      <div className="flex items-center">
        <div className="relative w-8 h-8 mr-2">
          <svg viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="#4CAF50" opacity="0.2"></circle>
            <circle cx="20" cy="20" r="12" fill="#4CAF50" opacity="0.5"></circle>
            <path d="M13,20 C13,13 20,10 27,13 C33,16 30,26 23,28 C16,30 13,27 13,20 Z" fill="#4CAF50"></path>
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-[Montserrat] text-xs font-bold">B</div>
        </div>
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
      </div>
      <div className="flex items-center">
        <button 
          className="p-2 text-gray-600 dark:text-gray-300 relative"
          onClick={goToNotifications}
        >
          <i className="fa-regular fa-bell text-lg"></i>
          {unreadNotificationsCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
              {unreadNotificationsCount}
            </Badge>
          )}
        </button>
        <button 
          className="p-2 text-gray-600 dark:text-gray-300"
          onClick={goToProfile}
        >
          <i className="fa-regular fa-user text-lg"></i>
        </button>
      </div>
    </header>
  );
}

export default AppHeader;