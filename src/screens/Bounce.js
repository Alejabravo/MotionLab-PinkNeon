
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Gesture,
  GestureDetector
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring
} from 'react-native-reanimated';
import { Screen, Hint, C } from '../components/UI';

export default function Bounce() {
  const scale = useSharedValue(1);

  const press = Gesture.LongPress()
    .minDuration(80)
    .onBegin(() => {
      scale.value = withTiming(0.55, {
        duration: 180
      });
    })
    .onFinalize(() => {
      scale.value = withSequence(
        withTiming(1.5, { duration: 230 }),
        withSpring(1, {
          damping: 4,
          stiffness: 110,
          mass: 0.9
        })
      );
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <Screen
      title="Rebote"
      subtitle="Presiona la figura y descubre un rebote mucho más intenso."
    >
      <View style={styles.area}>
        <GestureDetector gesture={press}>
          <Animated.View style={[
            styles.shape,
            animatedStyle
          ]}>
            <View style={styles.inner}>
              <Text style={styles.letter}>M</Text>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>

      <Text style={styles.label}>
        REBOTE ELÁSTICO
      </Text>

      <Text style={styles.detail}>
        Presiona · Reduce · Suelta · Rebota
      </Text>

      <Hint>
        Mantén presionada la figura y suéltala.
        Crecerá hasta el 150 % de su tamaño
        antes de regresar a su posición original.
      </Hint>
    </Screen>
  );
}

const styles = StyleSheet.create({
  area: {
    width: '100%',
    height: 290,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shape: {
    width: 155,
    height: 155,
    borderRadius: 40,
    backgroundColor: C.pink,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: C.pink,
    shadowOpacity: 0.8,
    shadowRadius: 25,
    elevation: 15
  },
  inner: {
    width: 125,
    height: 125,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFD1EE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  letter: {
    color: '#FFFFFF',
    fontSize: 85,
    fontWeight: '900'
  },
  label: {
    color: C.light,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2
  },
  detail: {
    color: C.muted,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 12
  }
});
