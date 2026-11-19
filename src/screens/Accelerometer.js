
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withSequence, withTiming
} from 'react-native-reanimated';
import { Accelerometer } from 'expo-sensors';
import {
  Screen, Hint, NeonTile, C
} from '../components/UI';

export default function AccelerometerScreen() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState(
    '¡Sacude tu celular!'
  );

  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    let last = 0;

    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener(
      ({ x, y, z }) => {
        const magnitude = Math.sqrt(
          x * x + y * y + z * z
        );

        const now = Date.now();

        if (magnitude > 2.5 && now - last > 1000) {
          last = now;

          setCount((v) => v + 1);
          setMessage('¡Sacudida detectada! ✨');

          rotation.value = withSequence(
            withTiming(-20, { duration: 70 }),
            withTiming(20, { duration: 70 }),
            withTiming(-15, { duration: 70 }),
            withTiming(15, { duration: 70 }),
            withTiming(0, { duration: 70 })
          );

          scale.value = withSequence(
            withTiming(1.18, { duration: 150 }),
            withTiming(1, { duration: 250 })
          );
        }
      }
    );

    return () => subscription.remove();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value }
    ]
  }));

  return (
    <Screen
      title="Acelerómetro"
      subtitle="¡Sacude tu teléfono para despertar la magia!"
    >
      <Animated.View style={animatedStyle}>
        <NeonTile>
          <Text style={{ fontSize: 85 }}>
            📱
          </Text>
          <Text style={{
            color: C.light,
            fontWeight: '900'
          }}>
            ✦ SHAKE ✦
          </Text>
        </NeonTile>
      </Animated.View>

      <Text style={s.message}>
        {message}
      </Text>

      <Text style={s.count}>
        🐾 Sacudidas: {count}
      </Text>

      <Hint>
        Esta actividad necesita un celular
        físico con acelerómetro.
      </Hint>
    </Screen>
  );
}

const s = StyleSheet.create({
  message: {
    fontSize: 20,
    fontWeight: '900',
    color: C.light,
    marginTop: 32,
    textAlign: 'center'
  },
  count: {
    backgroundColor: '#7B256C',
    color: C.white,
    overflow: 'hidden',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 18,
    fontWeight: '800'
  }
});
