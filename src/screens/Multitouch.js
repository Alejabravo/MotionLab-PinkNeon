

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable
} from 'react-native';

import {
  Gesture,
  GestureDetector
} from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';

import {
  Screen,
  Hint,
  C
} from '../components/UI';

// Fotografía guardada dentro del proyecto
const CAT = require('../assets/mis gatas.jpg');

export default function Multitouch() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const scale = useSharedValue(1);
  const rot = useSharedValue(0);

  const sx = useSharedValue(0);
  const sy = useSharedValue(0);
  const ss = useSharedValue(1);
  const sr = useSharedValue(0);

  const pan = Gesture.Pan()
    .averageTouches(true)
    .onBegin(() => {
      sx.value = x.value;
      sy.value = y.value;
    })
    .onUpdate((e) => {
      x.value = sx.value + e.translationX;
      y.value = sy.value + e.translationY;
    });

  const pinch = Gesture.Pinch()
    .onBegin(() => {
      ss.value = scale.value;
    })
    .onUpdate((e) => {
      scale.value = Math.min(
        4,
        Math.max(0.5, ss.value * e.scale)
      );
    });

  const rotation = Gesture.Rotation()
    .onBegin(() => {
      sr.value = rot.value;
    })
    .onUpdate((e) => {
      rot.value = sr.value + e.rotation;
    });

  const gesture = Gesture.Simultaneous(
    pan,
    pinch,
    rotation
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
      { rotate: `${rot.value}rad` }
    ]
  }));

  const reset = () => {
    x.value = withSpring(0);
    y.value = withSpring(0);
    scale.value = withSpring(1);
    rot.value = withSpring(0);
  };

  return (
    <Screen
      title="Mis gatas"
      subtitle="Acerca, aleja, mueve y gira la fotografía con tus dedos."
    >
      <View style={s.area}>
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[s.photo, animatedStyle]}
          >
            <Image
              source={CAT}
              style={s.image}
              resizeMode="cover"
            />
          </Animated.View>
        </GestureDetector>
      </View>

      <Pressable
        onPress={reset}
        style={s.button}
      >
        <Text style={s.buttonText}>
          RESTABLECER IMAGEN
        </Text>
      </Pressable>

      <Hint>
        Usa un dedo para mover la fotografía
        y dos dedos para ampliar, reducir
        o girar. La imagen está guardada
        dentro de MotionLab.
      </Hint>
    </Screen>
  );
}

const s = StyleSheet.create({
  area: {
    width: '100%',
    height: 280,
    alignItems: 'center',
    justifyContent: 'center'
  },

  photo: {
    width: 230,
    height: 230,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: C.pink,
    overflow: 'hidden',
    backgroundColor: C.panel,
    elevation: 10
  },

  image: {
    width: '100%',
    height: '100%'
  },

  button: {
    backgroundColor: '#842A70',
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 15
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1
  }
});
