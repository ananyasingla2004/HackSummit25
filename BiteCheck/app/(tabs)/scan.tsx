// import { StyleSheet, Image, Platform } from 'react-native';

// import { Collapsible } from '@/components/Collapsible';
// import { ExternalLink } from '@/components/ExternalLink';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { IconSymbol } from '@/components/ui/IconSymbol';

// export default function ScanScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
//       headerImage={
//         <IconSymbol
//           size={310}
//           color="#808080"
//           name="qrcode.viewfinder"
//           style={styles.headerImage}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Scan</ThemedText>
//       </ThemedView>
//       <ThemedText>Use this feature to scan QR codes and access information quickly.</ThemedText>
//       <Collapsible title="How it works">
//         <ThemedText>
//           The scan feature allows you to scan QR codes using your device's camera.
//         </ThemedText>
//         <ExternalLink href="https://reactnative.dev/docs/camera">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Supported Formats">
//         <ThemedText>
//           The scanner supports QR codes and barcodes for quick access to data.
//         </ThemedText>
//       </Collapsible>
//       <Collapsible title="Permissions">
//         <ThemedText>
//           Ensure the app has camera permissions enabled in your device settings.
//         </ThemedText>
//       </Collapsible>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     color: '#808080',
//     bottom: -90,
//     left: -35,
//     position: 'absolute',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
// });

// import { StyleSheet, Image, Platform } from 'react-native';

// import { Collapsible } from '@/components/Collapsible';
// import { ExternalLink } from '@/components/ExternalLink';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function ScanScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/qr-code.png')} // Ensure the correct path
//           style={styles.headerImage}
//           resizeMode="contain"
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Scan</ThemedText>
//       </ThemedView>
//       <ThemedText>Use this feature to scan QR codes and access information quickly.</ThemedText>
//       <Collapsible title="How it works">
//         <ThemedText>
//           The scan feature allows you to scan QR codes using your device's camera.
//         </ThemedText>
//         <ExternalLink href="https://reactnative.dev/docs/camera">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Supported Formats">
//         <ThemedText>
//           The scanner supports QR codes and barcodes for quick access to data.
//         </ThemedText>
//       </Collapsible>
//       <Collapsible title="Permissions">
//         <ThemedText>
//           Ensure the app has camera permissions enabled in your device settings.
//         </ThemedText>
//       </Collapsible>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     width: 310, 
//     height: 310,
//     alignSelf: 'center',
//     marginBottom: 20, // Adjust spacing
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
// });

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setData(`Scanned: ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camera}
      />
      {scanned && <Text style={styles.scannedText}>{data}</Text>}
      {scanned && <Button title="Scan Again" onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '80%',
  },
  scannedText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
});
