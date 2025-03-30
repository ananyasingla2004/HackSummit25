import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function RewardsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="gift.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Rewards</ThemedText>
      </ThemedView>
      <ThemedText>Earn points and redeem exciting rewards for your actions.</ThemedText>
      <Collapsible title="How to Earn Points">
        <ThemedText>
          Complete tasks, participate in challenges, and contribute to earn points.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Redeeming Rewards">
        <ThemedText>
          Use your points to unlock discounts, gifts, and exclusive benefits.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Leaderboard">
        <ThemedText>
          Compete with others and check your ranking on the rewards leaderboard.
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
