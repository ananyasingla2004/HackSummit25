import { useContext, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AppContext } from "../lib/context/app-context";

export function HealthTracker() {
  const { setCurrentPage } = useContext(AppContext);
  
  useEffect(() => {
    setCurrentPage("Health Tracker");
  }, [setCurrentPage]);

  // Sample data for the UI
  const todayIntake = 12;
  const dailyGoal = 20;
  const progressPercentage = Math.round((todayIntake / dailyGoal) * 100);
  
  // Sample consumption logs
  const todaysLog = [
    {
      id: 1,
      product: {
        name: "Chocolate Cookies",
        imageUrl: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=120&h=120",
      },
      amount: "6 pieces",
      time: "9:30 AM",
      palmOil: 8,
    },
    {
      id: 2,
      product: {
        name: "Organic Granola Bar",
        imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=120&h=120",
      },
      amount: "1 bar",
      time: "1:15 PM",
      palmOil: 0,
    },
  ];

  const yesterdaysLog = [
    {
      id: 3,
      product: {
        name: "Hazelnut Spread",
        imageUrl: "https://images.unsplash.com/photo-1614145121029-83a9f7b68bf4?auto=format&fit=crop&w=120&h=120",
      },
      amount: "2 tbsp",
      time: "8:45 AM",
      palmOil: 22,
    },
  ];

  return (
    <div className="p-4">
      <Card className="mb-4">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-3">Palm Oil Tracker</h2>
          
          {/* User Goal Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Your Daily Goal</span>
              <span className="text-xs text-primary">{todayIntake}/{dailyGoal} mL</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Weekly Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-neutral dark:bg-gray-700 p-2 rounded text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Daily Avg</div>
              <div className="font-medium">18 mL</div>
            </div>
            <div className="bg-neutral dark:bg-gray-700 p-2 rounded text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Weekly</div>
              <div className="font-medium">126 mL</div>
            </div>
            <div className="bg-neutral dark:bg-gray-700 p-2 rounded text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Trend</div>
              <div className="font-medium text-primary">↓ 15%</div>
            </div>
          </div>
          
          {/* Monthly Chart */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Monthly Trends</span>
              <div className="flex text-xs space-x-2">
                <button className="text-primary font-medium">Week</button>
                <button className="text-gray-500 dark:text-gray-400">Month</button>
              </div>
            </div>
            
            <div className="h-[180px] relative">
              <svg width="100%" height="100%" viewBox="0 0 300 150" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="0" x2="300" y2="0" stroke="#E5E7EB" strokeWidth="1" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="#E5E7EB" strokeWidth="1" />
                <line x1="0" y1="100" x2="300" y2="100" stroke="#E5E7EB" strokeWidth="1" />
                <line x1="0" y1="150" x2="300" y2="150" stroke="#E5E7EB" strokeWidth="1" />
                
                {/* Area under the line */}
                <path d="M0,90 L50,100 L100,85 L150,70 L200,60 L250,50 L300,40 L300,150 L0,150 Z" fill="#4CAF50" fillOpacity="0.1" />
                
                {/* Line */}
                <path d="M0,90 L50,100 L100,85 L150,70 L200,60 L250,50 L300,40" fill="none" stroke="#4CAF50" strokeWidth="2" />
                
                {/* Data Points */}
                <circle cx="0" cy="90" r="3" fill="#4CAF50" />
                <circle cx="50" cy="100" r="3" fill="#4CAF50" />
                <circle cx="100" cy="85" r="3" fill="#4CAF50" />
                <circle cx="150" cy="70" r="3" fill="#4CAF50" />
                <circle cx="200" cy="60" r="3" fill="#4CAF50" />
                <circle cx="250" cy="50" r="3" fill="#4CAF50" />
                <circle cx="300" cy="40" r="3" fill="#4CAF50" />
              </svg>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Now</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-3">Consumption Log</h2>
          
          {/* Today */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">Today</div>
            
            {todaysLog.map((item) => (
              <div key={item.id} className="flex items-center py-2 border-b dark:border-gray-700 last:border-none">
                <div className="bg-neutral dark:bg-gray-700 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name} 
                    className="w-8 h-8 object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.product.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{item.amount} · {item.time}</div>
                </div>
                <div className={`text-sm font-medium ${
                  item.palmOil > 15 ? "text-destructive" : 
                  item.palmOil > 5 ? "text-warning" : "text-primary"
                }`}>
                  {item.palmOil} mL
                </div>
              </div>
            ))}
          </div>
          
          {/* Yesterday */}
          <div className="mb-2">
            <div className="text-sm font-medium mb-2">Yesterday</div>
            
            {yesterdaysLog.map((item) => (
              <div key={item.id} className="flex items-center py-2 border-b dark:border-gray-700 last:border-none">
                <div className="bg-neutral dark:bg-gray-700 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name} 
                    className="w-8 h-8 object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.product.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{item.amount} · {item.time}</div>
                </div>
                <div className={`text-sm font-medium ${
                  item.palmOil > 15 ? "text-destructive" : 
                  item.palmOil > 5 ? "text-warning" : "text-primary"
                }`}>
                  {item.palmOil} mL
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full py-2 text-primary text-sm font-medium">
            View Full History
          </button>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-3">Health Insights</h2>
          
          <div className="p-3 bg-primary bg-opacity-10 rounded-lg mb-4">
            <div className="flex items-start">
              <i className="fas fa-lightbulb text-primary mt-0.5 mr-3"></i>
              <div>
                <div className="text-sm font-medium">Consumption Insight</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Your palm oil intake has decreased by 15% this week. Great job on making healthier choices!
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-warning bg-opacity-10 rounded-lg">
            <div className="flex items-start">
              <i className="fas fa-info-circle text-warning mt-0.5 mr-3"></i>
              <div>
                <div className="text-sm font-medium">Health Tip</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Replace processed snacks with fresh fruits to further reduce your palm oil intake and improve overall health.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default HealthTracker;
