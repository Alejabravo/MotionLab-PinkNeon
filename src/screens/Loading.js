
import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withRepeat, withTiming, Easing,
  cancelAnimation
} from 'react-native-reanimated';
import { Screen, Hint, C } from '../components/UI';

export default function Loading() {
  const spin = useSharedValue(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    spin.value = withRepeat(
      withTiming(360, {
        duration: 1200,
        easing: Easing.linear
      }),
      -1,
      false
    );

    progress.value = withRepeat(
      withTiming(1, {
        duration: 2400,
        easing: Easing.inOut(Easing.ease)
      }),
      -1,
      true
    );

    return () => {
      cancelAnimation(spin);
      cancelAnimation(progress);
    };
  }, []);

  const rotating = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }]
  }));

  const bar = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`
  }));

  return (
    <Screen
      title="Carga animada"
      subtitle="Un spinner infinito y una barra de progreso animada."
    >
      <View style={s.spinnerBox}>
        <Animated.View style={[s.ring, rotating]} />
        <Text style={s.heart}>💗</Text>
      </View>

      <Text style={s.loading}>
        Cargando magia...
      </Text>

      <View style={s.track}>
        <Animated.View style={[s.fill, bar]} />
      </View>

      <Hint>
        Ambas animaciones comienzan
        automáticamente al abrir la pantalla.
      </Hint>
    </Screen>
  );
}

const s = StyleSheet.create({
  spinnerBox: {
    width: 155,
    height: 155,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ring: {
    width: 145,
    height: 145,
    borderRadius: 90,
    borderWidth: 12,
    borderColor: '#522C61',
    borderTopColor: C.pink,
    borderRightColor: C.light,
    position: 'absolute'
  },
  heart: {
    fontSize: 65
  },
  loading: {
    color: C.white,
    fontSize: 19,
    fontWeight: '800',
    marginTop: 24,
    marginBottom: 25
  },
  track: {
    width: '88%',
    height: 17,
    backgroundColor: '#3B254B',
    borderRadius: 20,
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    backgroundColor: C.pink,
    borderRadius: 20
  }
});
