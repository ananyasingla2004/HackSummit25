import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface HomeProps {
  onGetStarted: () => void;
}

export function Home({ onGetStarted }: HomeProps) {
  const [, navigate] = useLocation();

  const handleGetStarted = () => {
    onGetStarted();
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col h-full justify-between p-6 text-center items-center">
      {/* App Logo */}
      <div className="mb-8 mt-20">
        <div className="relative inline-block">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="55" fill="#4CAF50" opacity="0.2"></circle>
            <circle cx="60" cy="60" r="40" fill="#4CAF50" opacity="0.5"></circle>
            <path d="M40,60 C40,40 60,30 80,40 C100,50 90,80 70,85 C50,90 40,80 40,60 Z" fill="#4CAF50"></path>
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-[Montserrat] text-2xl font-bold">
            Bite
          </div>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-3 font-[Montserrat]">Your Health, Your Choice</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">Track palm oil consumption for a healthier you</p>
        
        <Button 
          className="w-full max-w-xs py-6 text-base"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default Home;
