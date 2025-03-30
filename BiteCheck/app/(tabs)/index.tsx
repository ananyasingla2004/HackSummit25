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
//       <Text style={styles.welcomeText}>Welcome back, Rhythm!</Text>
//       <Text style={styles.subText}>Ready to track your habits?</Text>
      
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
//   welcomeText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
//   subText: {
//     fontSize: 16,
//     color: 'gray',
//     marginBottom: 20,
//   },
//   gridContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: 20,
//     width: '80%',
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

import { Image, StyleSheet, View, Text } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';

export default function HomeScreen(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={require('@/assets/images/home-agreement.png')} style={styles.logo} />
        <View style={styles.headerIcons}>
          <Image source={require('@/assets/images/notification.png')} style={styles.icon} />
          <Image source={require('@/assets/images/human.png')} style={styles.icon} />
        </View>
      </View>
      
      {/* Welcome Text */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome back, Rhythm!</Text>
        <Text style={styles.subText}>Ready to track your habits?</Text>
      </View>
   
      {/* Main Buttons Section */}
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.squareButton}>
          <Image source={require('@/assets/images/qr-code.png')} style={styles.squareIcon} />
          <Text>SCAN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.squareButton}>
          <Image source={require('@/assets/images/decrease.png')} style={styles.squareIcon} />
          <Text>TRACKS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.squareButton}>
          <Image source={require('@/assets/images/trophy.png')} style={styles.squareIcon} />
          <Text>LEADERBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.squareButton}>
          <Image source={require('@/assets/images/benefit.png')} style={styles.squareIcon} />
          <Text>REWARDS</Text>
        </TouchableOpacity>
      </View>

      {/* Footer remains unchanged */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  logo: {
    width: 60,
    height: 60,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
  welcomeContainer: {
    marginTop: 50, // Increased margin to move the welcome text downward
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 40, // Increased spacing before the buttons
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    width: '80%',
    marginTop: 20, // Moves the button section downward
  },
  squareButton: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  squareIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 20,
    paddingVertical: 10,
    backgroundColor: '#eee',
  },
  footerIcon: {
    width: 40,
    height: 40,
  },
});
