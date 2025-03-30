// import { Image, StyleSheet, View, Text } from 'react-native';
// import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
// import React from 'react';

// export default function HomeScreen(): JSX.Element {
//   return (
//     <GestureHandlerRootView style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <Image source={require('@/assets/images/home-agreement.png')} style={styles.logo} />
//         <View style={styles.headerIcons}>
//           <Image source={require('@/assets/images/notification.png')} style={styles.icon} />
//           <Image source={require('@/assets/images/human.png')} style={styles.icon} />
//         </View>
//       </View>
      
//       {/* Welcome Text */}
//       <View style={styles.welcomeContainer}>
//         <Text style={styles.welcomeText}>Welcome back, Rhythm!</Text>
//         <Text style={styles.subText}>Ready to track your habits?</Text>
//       </View>
   
//       {/* Main Buttons Section */}
//       <View style={styles.gridContainer}>
//         <TouchableOpacity style={styles.squareButton}>
//           <Image source={require('@/assets/images/qr-code.png')} style={styles.squareIcon} />
//           <Text>SCAN</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.squareButton}>
//           <Image source={require('@/assets/images/decrease.png')} style={styles.squareIcon} />
//           <Text>TRACKS</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.squareButton}>
//           <Image source={require('@/assets/images/trophy.png')} style={styles.squareIcon} />
//           <Text>LEADERBOARD</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.squareButton}>
//           <Image source={require('@/assets/images/benefit.png')} style={styles.squareIcon} />
//           <Text>REWARDS</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Footer remains unchanged */}
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 40,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '90%',
//   },
//   logo: {
//     width: 60,
//     height: 60,
//   },
//   headerIcons: {
//     flexDirection: 'row',
//   },
//   icon: {
//     width: 30,
//     height: 30,
//     marginLeft: 15,
//   },
//   welcomeContainer: {
//     marginTop: 50, // Increased margin to move the welcome text downward
//     alignItems: 'center',
//   },
//   welcomeText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   subText: {
//     fontSize: 16,
//     color: 'gray',
//     marginBottom: 40, // Increased spacing before the buttons
//   },
//   gridContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: 20,
//     width: '80%',
//     marginTop: 20, // Moves the button section downward
//   },
//   squareButton: {
//     width: 120,
//     height: 120,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//   },
//   squareIcon: {
//     width: 50,
//     height: 50,
//     marginBottom: 10,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     position: 'absolute',
//     bottom: 20,
//     paddingVertical: 10,
//     backgroundColor: '#eee',
//   },
//   footerIcon: {
//     width: 40,
//     height: 40,
//   },
// });


import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppContext } from "../../lib/context/app-context";
import { FontAwesome5 } from '@expo/vector-icons';

export default function HomeScreen(): JSX.Element {
  const { setCurrentPage } = useContext(AppContext) || {};

  useEffect(() => {
    setCurrentPage("Home");
  }, [setCurrentPage]);

  // Fetch recent product scans
  const { data: products, isLoading: isProductsLoading } = useQuery<Array<{ id: string; name: string; imageUrl: string; palmOilContent: string }>>({
    queryKey: ['/api/products'],
  });

  // Simulated data
  const todayIntake = "12 mL";
  const progressPercentage = 65;
  const badges = [
    { id: 1, name: "1 Week Streak", icon: "leaf", unlocked: true },
    { id: 2, name: "10 Scans", icon: "award", unlocked: true },
    { id: 3, name: "Healthy Choice", icon: "seedling", unlocked: false },
    { id: 4, name: "Top 10%", icon: "medal", unlocked: false },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <FontAwesome5 name="home" size={50} color="#4CAF50" />
        <View style={styles.headerIcons}>
          <FontAwesome5 name="bell" size={30} color="#4CAF50" style={styles.icon} />
          <FontAwesome5 name="user" size={30} color="#4CAF50" style={styles.icon} />
        </View>
      </View>
      
      {/* Welcome Text */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome back, Rhythm!</Text>
        <Text style={styles.subText}>Ready to track your habits?</Text>
      </View>

      {/* Today's Status */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Status</Text>
        <Text style={styles.intakeText}>Palm Oil Intake: {todayIntake}</Text>
        <Text style={styles.progressText}>Progress: {progressPercentage}%</Text>
      </View>

      {/* Achievements */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Achievements</Text>
        <View style={styles.badgesContainer}>
          {badges.map((badge) => (
            <View key={badge.id} style={styles.badge}>
              <FontAwesome5 
                name={badge.icon} 
                size={40} 
                color={badge.unlocked ? "#4CAF50" : "#B0BEC5"} 
              />
              <Text>{badge.name}</Text>
            </View>
          ))}
        </View>
      </View>
      
      {/* Recent Scans */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Scans</Text>
        {isProductsLoading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : products && products.length > 0 ? (
          products.slice(0, 3).map((product: any) => (
            <View key={product.id} style={styles.product}>
              <FontAwesome5 name="barcode" size={40} color="#4CAF50" style={styles.productIcon} />
              <Text>{product.name} - {product.palmOilContent}mL</Text>
            </View>
          ))
        ) : (
          <Text>No recent scans available</Text>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%' },
  headerIcons: { flexDirection: 'row' },
  icon: { marginLeft: 15 },
  welcomeContainer: { marginTop: 50, alignItems: 'center' },
  welcomeText: { fontSize: 20, fontWeight: 'bold' },
  subText: { fontSize: 16, color: 'gray', marginBottom: 40 },
  card: { width: '90%', backgroundColor: '#f8f8f8', padding: 20, borderRadius: 10, marginVertical: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  intakeText: { fontSize: 16, color: 'black' },
  progressText: { fontSize: 16, color: '#4CAF50' },
  badgesContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  badge: { alignItems: 'center' },
  product: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  productIcon: { marginRight: 10 }
});