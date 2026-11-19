
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Gesture,
  GestureDetector
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';
import { Screen, Hint, C } from '../components/UI';

function CatFace({ angry }) {
  return (
    <View style={styles.face}>
      <View style={styles.ears}>
        <View style={styles.ear} />
        <View style={styles.ear} />
      </View>

      <View style={styles.eyes}>
        <View style={styles.eye}>
          <View style={styles.pupil} />
        </View>
        <View style={styles.eye}>
          <View style={styles.pupil} />
        </View>
      </View>

      <View style={styles.nose} />

      <View style={[
        styles.mouth,
        angry && styles.angryMouth
      ]} />

      <View style={styles.whiskerLeft} />
      <View style={styles.whiskerRight} />
    </View>
  );
}

export default function DragRotate() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const direction = useDerivedValue(() => {
    if (x.value > 25) return 1;
    if (x.value < -25) return -1;
    return 0;
  });

  const pan = Gesture.Pan()
    .onBegin(() => {
      startX.value = x.value;
      startY.value = y.value;
    })
    .onUpdate((e) => {
      x.value = startX.value + e.translationX;
      y.value = startY.value + e.translationY;
    })
    .onEnd(() => {
      x.value = withSpring(0);
      y.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      {
        rotate: `${interpolate(
          x.value,
          [-170, 0, 170],
          [-30, 0, 30],
          Extrapolation.CLAMP
        )}deg`
      }
    ]
  }));

  const happyStyle = useAnimatedStyle(() => ({
    opacity: direction.value === -1 ? 1 : 0
  }));

  const angryStyle = useAnimatedStyle(() => ({
    opacity: direction.value === 1 ? 1 : 0
  }));

  const neutralStyle = useAnimatedStyle(() => ({
    opacity: direction.value === 0 ? 1 : 0
  }));

  return (
    <Screen
      title="Arrastrar y rotar"
      subtitle="Descubre cómo cambia la expresión del gato según la dirección."
    >
      <View style={styles.status}>
        <Animated.Text style={[
          styles.statusText, neutralStyle
        ]}>
          MUEVE AL GATO
        </Animated.Text>

        <Animated.Text style={[
          styles.statusText,
          styles.happyText,
          happyStyle
        ]}>
          GATO FELIZ
        </Animated.Text>

        <Animated.Text style={[
          styles.statusText,
          styles.angryText,
          angryStyle
        ]}>
          GATO ENOJADO
        </Animated.Text>
      </View>

      <GestureDetector gesture={pan}>
        <Animated.View style={[
          styles.catContainer,
          animatedStyle
        ]}>
          <CatFace angry={false} />
        </Animated.View>
      </GestureDetector>

      <View style={styles.directions}>
        <Text style={styles.direction}>
          IZQUIERDA: FELIZ
        </Text>
        <Text style={styles.direction}>
          DERECHA: ENOJADO
        </Text>
      </View>

      <Hint>
        Arrastra la figura hacia cualquier lado.
        Al soltarla regresará al centro.
      </Hint>
    </Screen>
  );
}

const styles = StyleSheet.create({
  status: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28
  },
  statusText: {
    position: 'absolute',
    color: C.light,
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 1
  },
  happyText: {
    color: '#71E8C3'
  },
  angryText: {
    color: '#FF688A'
  },
  catContainer: {
    width: 170,
    height: 170,
    borderRadius: 35,
    backgroundColor: C.panel2,
    borderWidth: 2,
    borderColor: C.pink,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10
  },
  face: {
    width: 110,
    height: 95,
    backgroundColor: '#FFCCE9',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ears: {
    position: 'absolute',
    top: -15,
    width: 90,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ear: {
    width: 30,
    height: 40,
    backgroundColor: '#FFCCE9',
    borderRadius: 8,
    transform: [{ rotate: '45deg' }]
  },
  eyes: {
    flexDirection: 'row',
    gap: 27,
    marginTop: 5
  },
  eye: {
    width: 15,
    height: 19,
    borderRadius: 10,
    backgroundColor: '#27132F',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pupil: {
    width: 4,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF'
  },
  nose: {
    width: 10,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#FF4FB5',
    marginTop: 8
  },
  mouth: {
    width: 20,
    height: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#27132F',
    borderRadius: 12,
    marginTop: 3
  },
  angryMouth: {
    transform: [{ rotate: '180deg' }]
  },
  whiskerLeft: {
    position: 'absolute',
    left: -8,
    top: 53,
    width: 28,
    height: 2,
    backgroundColor: '#27132F'
  },
  whiskerRight: {
    position: 'absolute',
    right: -8,
    top: 53,
    width: 28,
    height: 2,
    backgroundColor: '#27132F'
  },
  directions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40
  },
  direction: {
    color: C.light,
    fontSize: 11,
    fontWeight: '800'
  }
});
