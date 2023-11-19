import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet } from 'react-native';

interface GradientBackgroundProps {
  children: ReactNode;
}

const RainbowBackground: React.FC<GradientBackgroundProps> = ({ children }) => {
  return (
    <LinearGradient
      colors={['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']}
      style={styles.linearGradient}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.container}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default RainbowBackground;
