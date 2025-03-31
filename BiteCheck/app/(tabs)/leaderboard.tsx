import { useContext, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AppContext } from "../lib/context/app-context";
import { useQuery } from "@tanstack/react-query";

export function Leaderboard() {
  const { setCurrentPage } = useContext(AppContext);
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');
  
  useEffect(() => {
    setCurrentPage("Leaderboard");
  }, [setCurrentPage]);

  // Fetch leaderboard data
  const { data: leaderboardData, isLoading } = useQuery({
    queryKey: ['/api/leaderboard', { timeframe }],
  });

  // Sample data for current user's ranking
  const userRank = 5;
  const userPoints = 830;
  const userReduction = "6%";

  return (
    <div className="p-4">
      <Card className="mb-4">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-3">Your Ranking</h2>
          
          <div className="flex items-center justify-center space-x-4 py-4 mb-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-neutral dark:bg-gray-700 flex items-center justify-center mb-1">
                <i className="fas fa-medal text-warning text-xl"></i>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">2nd</div>
            </div>
            
            <div className="flex flex-col items-center scale-110">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center mb-1 animate-pulse">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="User avatar" 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                  #{userRank}
                </div>
              </div>
              <div className="text-sm font-medium">You</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-neutral dark:bg-gray-700 flex items-center justify-center mb-1">
                <i className="fas fa-award text-primary text-xl"></i>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">9th</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-neutral dark:bg-gray-700 p-3 rounded">
              <div className="text-xs text-gray-600 dark:text-gray-400">Weekly Rank</div>
              <div className="font-medium">#{userRank}</div>
            </div>
            <div className="bg-neutral dark:bg-gray-700 p-3 rounded">
              <div className="text-xs text-gray-600 dark:text-gray-400">Points</div>
              <div className="font-medium">{userPoints}</div>
            </div>
            <div className="bg-neutral dark:bg-gray-700 p-3 rounded">
              <div className="text-xs text-gray-600 dark:text-gray-400">Reduced</div>
              <div className="font-medium">{userReduction}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Leaderboard</h2>
            <div className="flex text-xs space-x-2">
              <button 
                className={timeframe === 'weekly' ? "text-primary font-medium" : "text-gray-500 dark:text-gray-400"}
                onClick={() => setTimeframe('weekly')}
              >
                Weekly
              </button>
              <button 
                className={timeframe === 'monthly' ? "text-primary font-medium" : "text-gray-500 dark:text-gray-400"}
                onClick={() => setTimeframe('monthly')}
              >
                Monthly
              </button>
              <button 
                className={timeframe === 'allTime' ? "text-primary font-medium" : "text-gray-500 dark:text-gray-400"}
                onClick={() => setTimeframe('allTime')}
              >
                All Time
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="py-4 text-center text-gray-500">Loading leaderboard...</div>
          ) : (
            <>
              {leaderboardData && leaderboardData.map((entry: any, index: number) => (
                <div 
                  key={entry.user.id} 
                  className={`flex items-center p-3 mb-2 rounded-lg ${
                    entry.user.id === 5 // Assuming current user id is 5 for demo
                      ? "bg-primary bg-opacity-10" 
                      : "bg-neutral dark:bg-gray-700"
                  }`}
                >
                  <div className="w-8 h-8 flex items-center justify-center font-bold mr-3">
                    {index + 1}
                  </div>
                  <div className="w-10 h-10 rounded-full mr-3">
                    <img 
                      src={entry.user.profileImage || `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${20 + index}.jpg`} 
                      alt="User avatar" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      {entry.user.id === 5 ? "You" : entry.user.displayName || entry.user.username}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {entry.reduction}% reduction this week
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${entry.user.id === 5 ? "text-primary" : ""}`}>
                    {entry.points} pts
                  </div>
                </div>
              ))}
              
              <button className="w-full py-2 text-primary text-sm font-medium">
                View All Rankings
              </button>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-3">Monthly Challenge</h2>
          
          <div className="p-4 bg-primary bg-opacity-10 rounded-lg mb-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mb-3">
                <i className="fas fa-leaf text-primary text-2xl"></i>
              </div>
              <div className="text-center">
                <div className="font-semibold mb-1">25% Palm Oil Reduction</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">13 days remaining</div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <div className="text-xs text-right mt-1">40% complete</div>
              </div>
            </div>
          </div>
          
          <h3 className="text-sm font-medium mb-2">Current Participants</h3>
          
          <div className="flex mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-full -mr-1 border border-white dark:border-gray-800"
              >
                <img 
                  src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${30 + i}.jpg`} 
                  alt="User avatar" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            ))}
            <div className="w-8 h-8 bg-neutral dark:bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-600 dark:text-gray-400 border border-white dark:border-gray-800">
              +15
            </div>
          </div>
          
          <button className="w-full py-2 px-4 mt-2 border border-primary text-primary rounded-lg text-sm font-medium">
            Invite Friends
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Leaderboard;