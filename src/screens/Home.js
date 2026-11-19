
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withSpring,
  Easing,
  interpolate,
  cancelAnimation
} from 'react-native-reanimated';

import { C } from '../components/UI';

// Foto local de tus gatas.
// Debe existir en src/assets.
const CAT_PHOTO = require('../assets/mis gatas.jpg');

// ---------------------------------------
// 1. MINI GATO QUE SE INCLINA
// ---------------------------------------

function CatPreview() {
  const rotation = useSharedValue(0);
  const movement = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(-14, { duration: 650 }),
        withTiming(14, { duration: 1300 }),
        withTiming(0, { duration: 650 })
      ),
      -1,
      false
    );

    movement.value = withRepeat(
      withSequence(
        withTiming(-9, { duration: 650 }),
        withTiming(9, { duration: 1300 }),
        withTiming(0, { duration: 650 })
      ),
      -1,
      false
    );

    return () => {
      cancelAnimation(rotation);
      cancelAnimation(movement);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: movement.value },
      { rotate: `${rotation.value}deg` }
    ]
  }));

  return (
    <View style={styles.preview}>
      <Animated.View
        style={[styles.catHead, animatedStyle]}
      >
        <View style={styles.catEars}>
          <View style={styles.catEar} />
          <View style={styles.catEar} />
        </View>

        <View style={styles.catEyes}>
          <View style={styles.catEye} />
          <View style={styles.catEye} />
        </View>

        <View style={styles.catNose} />

        <View style={styles.catMouth} />
      </Animated.View>
    </View>
  );
}

// ---------------------------------------
// 2. MINI SPINNER INFINITO
// ---------------------------------------

function LoadingPreview() {
  const spin = useSharedValue(0);

  useEffect(() => {
    spin.value = withRepeat(
      withTiming(360, {
        duration: 1300,
        easing: Easing.linear
      }),
      -1,
      false
    );

    return () => cancelAnimation(spin);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${spin.value}deg` }
    ]
  }));

  return (
    <View style={styles.preview}>
      <Animated.View
        style={[styles.spinner, animatedStyle]}
      />

      <View style={styles.spinnerCenter}>
        <View style={styles.spinnerDot} />
      </View>
    </View>
  );
}

// ---------------------------------------
// 3. MINI FOTO MULTITÁCTIL
// ---------------------------------------

function MultitouchPreview() {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.13, { duration: 1100 }),
        withTiming(0.95, { duration: 1100 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      false
    );

    rotation.value = withRepeat(
      withSequence(
        withTiming(-7, { duration: 1100 }),
        withTiming(7, { duration: 1100 }),
        withTiming(0, { duration: 500 })
      ),
      -1,
      false
    );

    return () => {
      cancelAnimation(scale);
      cancelAnimation(rotation);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ]
  }));

  return (
    <View style={styles.preview}>
      <Animated.View
        style={[styles.photoFrame, animatedStyle]}
      >
        <Image
          source={CAT_PHOTO}
          style={styles.photo}
          resizeMode="cover"
        />
      </Animated.View>

      <View style={styles.photoCornerOne} />
      <View style={styles.photoCornerTwo} />
    </View>
  );
}

// ---------------------------------------
// 4. MINI ESFERA CON REBOTE
// ---------------------------------------

function BouncePreview() {
  const jump = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    jump.value = withRepeat(
      withSequence(
        withTiming(-24, {
          duration: 450,
          easing: Easing.out(Easing.quad)
        }),
        withTiming(0, {
          duration: 450,
          easing: Easing.in(Easing.quad)
        }),
        withTiming(-10, { duration: 220 }),
        withTiming(0, { duration: 220 })
      ),
      -1,
      false
    );

    scale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 450 }),
        withSpring(0.85, {
          damping: 5,
          stiffness: 180
        }),
        withTiming(1, { duration: 450 })
      ),
      -1,
      false
    );

    return () => {
      cancelAnimation(jump);
      cancelAnimation(scale);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: jump.value },
      { scale: scale.value }
    ]
  }));

  return (
    <View style={styles.preview}>
      <View style={styles.bounceGround} />

      <Animated.View
        style={[styles.bounceBall, animatedStyle]}
      >
        <View style={styles.ballHighlight} />
      </Animated.View>
    </View>
  );
}

// ---------------------------------------
// 5. MINI CARRUSEL DE TARJETAS
// ---------------------------------------

function CarouselPreview() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease)
      }),
      -1,
      true
    );

    return () => cancelAnimation(progress);
  }, []);

  const leftStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [-7, 3]
        )
      },
      {
        rotate: `${interpolate(
          progress.value,
          [0, 1],
          [-15, -5]
        )}deg`
      }
    ]
  }));

  const rightStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [7, -3]
        )
      },
      {
        rotate: `${interpolate(
          progress.value,
          [0, 1],
          [15, 5]
        )}deg`
      }
    ]
  }));

  const centerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          progress.value,
          [0, 1],
          [1, 1.12]
        )
      },
      {
        translateY: interpolate(
          progress.value,
          [0, 1],
          [0, -5]
        )
      }
    ]
  }));

  return (
    <View style={styles.preview}>
      <Animated.View
        style={[
          styles.carouselCard,
          styles.carouselLeft,
          leftStyle
        ]}
      />

      <Animated.View
        style={[
          styles.carouselCard,
          styles.carouselRight,
          rightStyle
        ]}
      />

      <Animated.View
        style={[
          styles.carouselCard,
          styles.carouselCenter,
          centerStyle
        ]}
      >
        <View style={styles.carouselLine} />
        <View style={styles.carouselLineSmall} />
      </Animated.View>
    </View>
  );
}

// ---------------------------------------
// 6. MINI TELÉFONO QUE VIBRA
// ---------------------------------------

function AccelerometerPreview() {
  const shake = useSharedValue(0);

  useEffect(() => {
    shake.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 75 }),
        withTiming(8, { duration: 75 }),
        withTiming(-6, { duration: 75 }),
        withTiming(6, { duration: 75 }),
        withTiming(0, { duration: 120 }),
        withTiming(0, { duration: 950 })
      ),
      -1,
      false
    );

    return () => cancelAnimation(shake);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${shake.value}deg` }
    ]
  }));

  return (
    <View style={styles.preview}>
      <View style={styles.signalLeft}>
        <View style={styles.signalLine} />
        <View style={styles.signalLineShort} />
      </View>

      <Animated.View
        style={[styles.phone, animatedStyle]}
      >
        <View style={styles.phoneSpeaker} />

        <View style={styles.phoneScreen}>
          <View style={styles.phonePulse} />
        </View>

        <View style={styles.phoneButton} />
      </Animated.View>

      <View style={styles.signalRight}>
        <View style={styles.signalLine} />
        <View style={styles.signalLineShort} />
      </View>
    </View>
  );
}

// ---------------------------------------
// TARJETAS DE LA PANTALLA PRINCIPAL
// ---------------------------------------

const exercises = [
  {
    route: 'DragRotate',
    title: 'Arrastrar y rotar',
    description: 'Dirección y emociones',
    Preview: CatPreview
  },
  {
    route: 'Loading',
    title: 'Carga animada',
    description: 'Movimiento infinito',
    Preview: LoadingPreview
  },
  {
    route: 'Multitouch',
    title: 'Gestos multitáctiles',
    description: 'Mis gatas',
    Preview: MultitouchPreview
  },
  {
    route: 'Bounce',
    title: 'Rebote',
    description: 'Elasticidad extrema',
    Preview: BouncePreview
  },
  {
    route: 'Carousel',
    title: 'Carrusel animado',
    description: 'Transiciones visuales',
    Preview: CarouselPreview
  },
  {
    route: 'Accelerometer',
    title: 'Acelerómetro',
    description: 'Detección de movimiento',
    Preview: AccelerometerPreview
  }
];

function ExerciseCard({ item, navigation }) {
  const Preview = item.Preview;

  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate(item.route)}
    >
      <View style={styles.cardPreview}>
        <Preview />
      </View>

      <Text style={styles.cardTitle}>
        {item.title}
      </Text>

      <Text style={styles.cardDescription}>
        {item.description}
      </Text>

      <View style={styles.cardBottom}>
        <View style={styles.cardLine} />

        <Text style={styles.cardAction}>
          EXPLORAR
        </Text>
      </View>
    </Pressable>
  );
}

// ---------------------------------------
// PANTALLA PRINCIPAL
// ---------------------------------------

export default function Home({ navigation }) {
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.body}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Text style={styles.kicker}>
          REACT NATIVE + REANIMATED
        </Text>

        <Text style={styles.brand}>
          MotionLab
        </Text>

        <View style={styles.brandLine} />

        <Text style={styles.edition}>
          PINK NEON EDITION
        </Text>

        <Text style={styles.intro}>
          Un laboratorio interactivo donde
          el diseño cobra movimiento.
        </Text>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>
            Explora las animaciones
          </Text>

          <Text style={styles.sectionSubtitle}>
            Seis experiencias interactivas
          </Text>
        </View>
      </View>

      <View style={styles.grid}>
        {exercises.map((item) => (
          <ExerciseCard
            key={item.route}
            item={item}
            navigation={navigation}
          />
        ))}
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          LABORATORIO INTERACTIVO
        </Text>

        <Text style={styles.bannerText}>
          Cada tarjeta presenta una demostración
          animada del ejercicio que puedes explorar.
        </Text>
      </View>

      <Text style={styles.footer}>
        MOTIONLAB | PINK NEON EDITION | 2026
      </Text>
    </ScrollView>
  );
}

// ---------------------------------------
// ESTILOS
// ---------------------------------------

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: C.bg
  },

  body: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 40
  },

  hero: {
    alignItems: 'center',
    paddingVertical: 22
  },

  kicker: {
    color: C.light,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2
  },

  brand: {
    color: C.pink,
    fontSize: 42,
    fontWeight: '900',
    marginTop: 12
  },

  brandLine: {
    width: 90,
    height: 4,
    borderRadius: 10,
    backgroundColor: C.pink,
    marginTop: 13
  },

  edition: {
    color: C.white,
    fontSize: 12,
    letterSpacing: 3,
    fontWeight: '800',
    marginTop: 16
  },

  intro: {
    color: C.muted,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 14
  },

  sectionHeader: {
    marginTop: 15,
    marginBottom: 20
  },

  sectionTitle: {
    color: C.white,
    fontSize: 22,
    fontWeight: '900'
  },

  sectionSubtitle: {
    color: C.muted,
    fontSize: 12,
    marginTop: 7
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  card: {
    width: '48%',
    minHeight: 245,
    backgroundColor: C.panel,
    borderWidth: 1.4,
    borderColor: '#844070',
    borderRadius: 24,
    padding: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 5
  },

  cardPreview: {
    height: 125,
    width: '100%',
    borderRadius: 17,
    backgroundColor: '#30183F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13
  },

  preview: {
    width: '100%',
    height: 115,
    alignItems: 'center',
    justifyContent: 'center'
  },

  cardTitle: {
    color: C.white,
    fontSize: 14,
    fontWeight: '900'
  },

  cardDescription: {
    color: C.muted,
    fontSize: 11,
    marginTop: 6
  },

  cardBottom: {
    marginTop: 'auto',
    paddingTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  cardLine: {
    width: 25,
    height: 3,
    backgroundColor: C.pink,
    borderRadius: 3
  },

  cardAction: {
    color: C.light,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1
  },

  // GATO

  catHead: {
    width: 78,
    height: 70,
    borderRadius: 30,
    backgroundColor: '#FFC1E5',
    alignItems: 'center',
    justifyContent: 'center'
  },

  catEars: {
    position: 'absolute',
    top: -11,
    width: 65,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  catEar: {
    width: 23,
    height: 28,
    borderRadius: 5,
    backgroundColor: '#FFC1E5',
    transform: [{ rotate: '45deg' }]
  },

  catEyes: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 5
  },

  catEye: {
    width: 9,
    height: 13,
    backgroundColor: '#30183F',
    borderRadius: 7
  },

  catNose: {
    width: 8,
    height: 6,
    backgroundColor: C.pink,
    borderRadius: 4,
    marginTop: 6
  },

  catMouth: {
    width: 15,
    height: 7,
    borderBottomWidth: 2,
    borderBottomColor: '#30183F',
    borderRadius: 10,
    marginTop: 3
  },

  // SPINNER

  spinner: {
    width: 83,
    height: 83,
    borderRadius: 50,
    borderWidth: 9,
    borderColor: '#63325F',
    borderTopColor: C.pink,
    borderRightColor: C.light
  },

  spinnerCenter: {
    position: 'absolute',
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#49244C'
  },

  spinnerDot: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: C.pink
  },

  // FOTO MULTITOUCH

  photoFrame: {
    width: 90,
    height: 90,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: C.pink,
    backgroundColor: C.panel
  },

  photo: {
    width: '100%',
    height: '100%'
  },

  photoCornerOne: {
    position: 'absolute',
    top: 6,
    left: 10,
    width: 15,
    height: 15,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: C.light
  },

  photoCornerTwo: {
    position: 'absolute',
    bottom: 6,
    right: 10,
    width: 15,
    height: 15,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: C.light
  },

  // REBOTE

  bounceGround: {
    position: 'absolute',
    bottom: 12,
    width: 75,
    height: 8,
    backgroundColor: '#72336E',
    borderRadius: 50
  },

  bounceBall: {
    width: 68,
    height: 68,
    borderRadius: 35,
    backgroundColor: C.pink,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    elevation: 9
  },

  ballHighlight: {
    width: 20,
    height: 11,
    backgroundColor: '#FFD0EE',
    borderRadius: 15,
    marginTop: 13,
    marginLeft: 13,
    transform: [{ rotate: '-25deg' }]
  },

  // CARRUSEL

  carouselCard: {
    position: 'absolute',
    width: 60,
    height: 84,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: C.light
  },

  carouselLeft: {
    backgroundColor: '#6C2B76',
    left: '15%'
  },

  carouselRight: {
    backgroundColor: '#A83C91',
    right: '15%'
  },

  carouselCenter: {
    backgroundColor: '#E44AA5',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7
  },

  carouselLine: {
    width: 34,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#FFD6F0'
  },

  carouselLineSmall: {
    width: 23,
    height: 4,
    borderRadius: 5,
    backgroundColor: '#FFD6F0',
    marginTop: 9
  },

  // ACELERÓMETRO

  phone: {
    width: 54,
    height: 91,
    borderWidth: 3,
    borderColor: C.light,
    borderRadius: 11,
    backgroundColor: '#4B2557',
    alignItems: 'center',
    paddingTop: 6
  },

  phoneSpeaker: {
    width: 17,
    height: 3,
    backgroundColor: C.light,
    borderRadius: 3
  },

  phoneScreen: {
    width: 39,
    height: 58,
    backgroundColor: '#7D3479',
    marginTop: 6,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },

  phonePulse: {
    width: 20,
    height: 20,
    borderWidth: 3,
    borderColor: C.pink,
    borderRadius: 10
  },

  phoneButton: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: C.light,
    marginTop: 4
  },

  signalLeft: {
    position: 'absolute',
    left: '13%',
    gap: 8
  },

  signalRight: {
    position: 'absolute',
    right: '13%',
    gap: 8
  },

  signalLine: {
    width: 16,
    height: 4,
    backgroundColor: C.pink,
    borderRadius: 4
  },

  signalLineShort: {
    width: 10,
    height: 4,
    backgroundColor: C.light,
    borderRadius: 4
  },

  // PARTE INFERIOR

  banner: {
    backgroundColor: '#321A42',
    borderWidth: 1,
    borderColor: C.pink,
    borderRadius: 20,
    padding: 20,
    marginTop: 15
  },

  bannerTitle: {
    color: C.light,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1
  },

  bannerText: {
    color: C.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 9
  },

  footer: {
    color: '#977BA5',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 24,
    letterSpacing: 1
  }
});

