import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TrackScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="map.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Track</ThemedText>
      </ThemedView>
      <ThemedText>Monitor your progress and track key activities.</ThemedText>
      <Collapsible title="Activity Tracking">
        <ThemedText>
          View your completed tasks, ongoing progress, and history.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Location-based Tracking">
        <ThemedText>
          If applicable, track locations relevant to your activity in real-time.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Reports and Insights">
        <ThemedText>
          Access analytics and insights about your performance over time.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
