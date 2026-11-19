
import React from 'react';
import {
  View, Text, useWindowDimensions, StyleSheet
} from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle,
  interpolate, Extrapolation,
  useAnimatedScrollHandler
} from 'react-native-reanimated';
import { Screen, Hint, C } from '../components/UI';

const cards = [
  ['01', 'Gatita astronauta', '🐱‍🚀', '#48206D'],
  ['02', 'Mundo rosado', '💗', '#71305C'],
  ['03', 'Patitas mágicas', '🐾', '#46307B'],
  ['04', 'Noche estelar', '🌙', '#2B4479'],
  ['05', 'Código y amor', '💻', '#6C285B']
];

function Item({ item, index, x, step, width }) {
  const animatedStyle = useAnimatedStyle(() => {
    const input = [
      (index - 1) * step,
      index * step,
      (index + 1) * step
    ];

    return {
      transform: [
        {
          scale: interpolate(
            x.value, input,
            [0.82, 1, 0.82],
            Extrapolation.CLAMP
          )
        },
        {
          rotate: `${interpolate(
            x.value, input,
            [9, 0, -9],
            Extrapolation.CLAMP
          )}deg`
        }
      ],
      opacity: interpolate(
        x.value, input,
        [0.6, 1, 0.6],
        Extrapolation.CLAMP
      )
    };
  });

  return (
    <Animated.View style={[
      s.card,
      { width, backgroundColor: item[3] },
      animatedStyle
    ]}>
      <Text style={s.stars}>✦ ✧ ✦</Text>
      <Text style={s.icon}>{item[2]}</Text>
      <Text style={s.name}>{item[1]}</Text>
      <Text style={s.index}>
        {item[0]} / 05
      </Text>
    </Animated.View>
  );
}

export default function Carousel() {
  const { width: W } = useWindowDimensions();
  const width = Math.min(W * 0.68, 285);
  const gap = 14;
  const step = width + gap;
  const x = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((e) => {
    x.value = e.contentOffset.x;
  });

  return (
    <Screen
      title="Carrusel animado"
      subtitle="Desliza las tarjetas y descubre sus efectos."
    >
      <View style={{ height: 320, width: W }}>
        <Animated.FlatList
          horizontal
          data={cards}
          keyExtractor={(item) => item[0]}
          renderItem={({ item, index }) => (
            <Item
              item={item}
              index={index}
              x={x}
              step={step}
              width={width}
            />
          )}
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          snapToInterval={step}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal: (W - width) / 2,
            paddingRight: (W - width) / 2 - gap
          }}
          ItemSeparatorComponent={() => (
            <View style={{ width: gap }} />
          )}
        />
      </View>

      <Hint>
        Desliza horizontalmente para
        explorar las cinco tarjetas.
      </Hint>
    </Screen>
  );
}

const s = StyleSheet.create({
  card: {
    height: 300,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: C.pink,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: C.pink,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8
  },
  stars: {
    color: C.light,
    fontSize: 24,
    letterSpacing: 7
  },
  icon: {
    fontSize: 85,
    marginVertical: 17
  },
  name: {
    color: C.white,
    fontSize: 21,
    fontWeight: '900',
    textAlign: 'center'
  },
  index: {
    color: C.light,
    marginTop: 14,
    fontWeight: '700'
  }
});
