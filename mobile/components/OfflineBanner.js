import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const OfflineBanner = ({ theme }) => {
  const [visible, setVisible] = useState(false);
  const translateY = React.useRef(new Animated.Value(-60)).current;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isOffline = !(state.isConnected && state.isInternetReachable !== false);
      setVisible(isOffline);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : -60,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible, translateY]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          backgroundColor: theme?.colors?.surface || '#ffffff',
          borderColor: theme?.colors?.border || '#e6e6e6',
        },
      ]}
    >
      <View style={styles.inner}>
        <View
          style={[
            styles.dot,
            { backgroundColor: theme?.colors?.offline || '#b45309' },
          ]}
        />
        <Text
          style={[
            styles.text,
            { color: theme?.colors?.textSecondary || '#666' },
          ]}
        >
          You are offline
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    borderBottomWidth: 1,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default OfflineBanner;
