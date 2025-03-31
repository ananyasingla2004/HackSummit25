// import { useContext, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { AppContext } from "../lib/context/app-context";
// import { FontAwesome5 } from '@expo/vector-icons';

// export default function HomeScreen(): JSX.Element {
//   const { setCurrentPage } = useContext(AppContext) || {};

//   useEffect(() => {
//     setCurrentPage("Home");
//   }, [setCurrentPage]);

//   // Fetch recent product scans
//   const { data: products, isLoading: isProductsLoading } = useQuery<Array<{ id: string; name: string; imageUrl: string; palmOilContent: string }>>({
//     queryKey: ['/api/products'],
//   });

//   // Simulated data
//   const todayIntake = "12 mL";
//   const progressPercentage = 65;
//   const badges = [
//     { id: 1, name: "1 Week Streak", icon: "leaf", unlocked: true },
//     { id: 2, name: "10 Scans", icon: "award", unlocked: true },
//     { id: 3, name: "Healthy Choice", icon: "seedling", unlocked: false },
//     { id: 4, name: "Top 10%", icon: "medal", unlocked: false },
//   ];

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <FontAwesome5 name="home" size={50} color="#4CAF50" />
//         <View style={styles.headerIcons}>
//           <FontAwesome5 name="bell" size={30} color="#4CAF50" style={styles.icon} />
//           <FontAwesome5 name="user" size={30} color="#4CAF50" style={styles.icon} />
//         </View>
//       </View>
      
//       {/* Welcome Text */}
//       <View style={styles.welcomeContainer}>
//         <Text style={styles.welcomeText}>Welcome back, Rhythm!</Text>
//         <Text style={styles.subText}>Ready to track your habits?</Text>
//       </View>

//       {/* Today's Status */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Today's Status</Text>
//         <Text style={styles.intakeText}>Palm Oil Intake: {todayIntake}</Text>
//         <Text style={styles.progressText}>Progress: {progressPercentage}%</Text>
//       </View>

//       {/* Achievements */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Your Achievements</Text>
//         <View style={styles.badgesContainer}>
//           {badges.map((badge) => (
//             <View key={badge.id} style={styles.badge}>
//               <FontAwesome5 
//                 name={badge.icon} 
//                 size={40} 
//                 color={badge.unlocked ? "#4CAF50" : "#B0BEC5"} 
//               />
//               <Text>{badge.name}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
      
//       {/* Recent Scans */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Recent Scans</Text>
//         {isProductsLoading ? (
//           <ActivityIndicator size="large" color="#4CAF50" />
//         ) : products && products.length > 0 ? (
//           products.slice(0, 3).map((product: any) => (
//             <View key={product.id} style={styles.product}>
//               <FontAwesome5 name="barcode" size={40} color="#4CAF50" style={styles.productIcon} />
//               <Text>{product.name} - {product.palmOilContent}mL</Text>
//             </View>
//           ))
//         ) : (
//           <Text>No recent scans available</Text>
//         )}
//       </View>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', paddingTop: 40, backgroundColor: '#fff' },
//   header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%' },
//   headerIcons: { flexDirection: 'row' },
//   icon: { marginLeft: 15 },
//   welcomeContainer: { marginTop: 50, alignItems: 'center' },
//   welcomeText: { fontSize: 20, fontWeight: 'bold' },
//   subText: { fontSize: 16, color: 'gray', marginBottom: 40 },
//   card: { width: '90%', backgroundColor: '#f8f8f8', padding: 20, borderRadius: 10, marginVertical: 10 },
//   cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
//   intakeText: { fontSize: 16, color: 'black' },
//   progressText: { fontSize: 16, color: '#4CAF50' },
//   badgesContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
//   badge: { alignItems: 'center' },
//   product: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
//   productIcon: { marginRight: 10 }
// });

import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { AppContext } from "@/lib/context/app-context";
import { api } from "@/lib/api";

export function Dashboard() {
  const [, navigate] = useLocation();
  const { setCurrentPage } = useContext(AppContext);
  
  useEffect(() => {
    setCurrentPage("Dashboard");
  }, [setCurrentPage]);

  // Get products data for recent scans
  const { data: products, isLoading: isProductsLoading } = useQuery({ 
    queryKey: ['/api/products'], 
  });

  // Simulated data for the UI
  const todayIntake = "12 mL";
  const progressPercentage = 65;
  
  // Simulated badge data
  const badges = [
    { id: 1, name: "1 Week Streak", icon: "fas fa-leaf", unlocked: true },
    { id: 2, name: "10 Scans", icon: "fas fa-award", unlocked: true },
    { id: 3, name: "Healthy Choice", icon: "fas fa-seedling", unlocked: false },
    { id: 4, name: "Top 10%", icon: "fas fa-medal", unlocked: false },
  ];

  return (
    <div className="p-4">
      <Card className="mb-4">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-3">Today's Status</h2>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-600 dark:text-gray-400 text-sm">Palm Oil Intake</span>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">{todayIntake}</span>
                <span className="text-xs text-primary ml-2">-15% vs avg</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-neutral dark:bg-gray-700 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-primary flex items-center justify-center">
                <span className="text-sm font-bold">{progressPercentage}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Weekly Progress</h2>
            <button className="text-xs text-primary">View All</button>
          </div>
          
          <div className="h-[180px] relative">
            <svg width="100%" height="100%" viewBox="0 0 300 150" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="0" x2="300" y2="0" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="0" y1="50" x2="300" y2="50" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="0" y1="100" x2="300" y2="100" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="0" y1="150" x2="300" y2="150" stroke="#E5E7EB" strokeWidth="1" />
              
              {/* Bars */}
              <rect x="27" y="60" width="15" height="90" fill="#4CAF50" rx="2" />
              <rect x="68" y="40" width="15" height="110" fill="#4CAF50" rx="2" />
              <rect x="109" y="70" width="15" height="80" fill="#4CAF50" rx="2" />
              <rect x="150" y="50" width="15" height="100" fill="#4CAF50" rx="2" />
              <rect x="191" y="90" width="15" height="60" fill="#4CAF50" rx="2" />
              <rect x="232" y="30" width="15" height="120" fill="#4CAF50" rx="2" />
              <rect x="273" y="80" width="15" height="70" fill="#4CAF50" rx="2" />
            </svg>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Your Achievements</h2>
            <button className="text-xs text-primary">See All</button>
          </div>
          
          <div className="flex justify-between">
            {badges.map((badge) => (
              <div key={badge.id} className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105">
                <div className={`w-14 h-14 mb-1 rounded-full flex items-center justify-center ${
                  badge.unlocked 
                    ? "bg-primary bg-opacity-10" 
                    : "bg-gray-200 dark:bg-gray-700"
                }`}>
                  <i className={`${badge.icon} text-xl ${
                    badge.unlocked 
                      ? "text-primary" 
                      : "text-gray-400 dark:text-gray-500"
                  }`}></i>
                </div>
                <span className="text-xs text-center">{badge.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Recent Scans</h2>
            <button className="text-xs text-primary">View All</button>
          </div>
          
          {isProductsLoading ? (
            <div className="py-6 text-center text-gray-500">Loading recent scans...</div>
          ) : (
            products && products.length > 0 ? (
              products.slice(0, 3).map((product: any) => (
                <div 
                  key={product.id} 
                  className="flex items-center py-2 border-b dark:border-gray-700 last:border-none cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="bg-neutral dark:bg-gray-700 w-12 h-12 rounded-lg flex items-center justify-center mr-3">
                    {product.imageUrl && (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{product.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {product.brand} · {product.palmOilContent}mL palm oil
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    product.palmOilStatus === 0 ? "bg-primary" : 
                    product.palmOilStatus === 1 ? "bg-warning" : "bg-destructive"
                  }`}></div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-gray-500">No recent scans available</div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;