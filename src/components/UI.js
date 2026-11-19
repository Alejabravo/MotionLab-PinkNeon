
import React from 'react';
import {
  View, Text, ScrollView, StyleSheet
} from 'react-native';

export const C = {
  bg: '#0D0919',
  panel: '#21132F',
  panel2: '#2C1839',
  pink: '#FF4FB5',
  light: '#FFB7E5',
  purple: '#A55CFF',
  white: '#FFF7FF',
  muted: '#C9B5D2',
  line: '#78406D',
};

export function Screen({
  title, subtitle, children, scroll = false
}) {
  const content = (
    <>
      <View style={s.hero}>
        <Text style={s.eyebrow}>
          ✦ MOTIONLAB · PINK NEON ✦
        </Text>
        <Text style={s.title}>{title}</Text>
        <View style={s.rule} />
        <Text style={s.subtitle}>{subtitle}</Text>
      </View>
      <View style={s.stage}>{children}</View>
      <Text style={s.footer}>
        ✦ Código, magia y patitas 🐾
      </Text>
    </>
  );

  if (scroll) {
    return (
      <ScrollView
        style={s.page}
        contentContainerStyle={s.scroll}
      >
        {content}
      </ScrollView>
    );
  }

  return (
    <View style={s.page}>
      <View style={s.fill}>{content}</View>
    </View>
  );
}

export function Hint({ children }) {
  return (
    <View style={s.hint}>
      <Text style={s.hintText}>
        💡 {children}
      </Text>
    </View>
  );
}

export function NeonTile({ children, size = 170 }) {
  return (
    <View style={[
      s.tile,
      {
        width: size,
        height: size,
        borderRadius: size * 0.23
      }
    ]}>
      {children}
    </View>
  );
}

const s = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: C.bg
  },
  fill: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30
  },
  hero: {
    alignItems: 'center',
    paddingTop: 8
  },
  eyebrow: {
    color: C.light,
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '800'
  },
  title: {
    color: C.white,
    fontSize: 27,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 14
  },
  rule: {
    backgroundColor: C.pink,
    width: 85,
    height: 4,
    borderRadius: 4,
    marginVertical: 15
  },
  subtitle: {
    color: C.muted,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21
  },
  stage: {
    flex: 1,
    minHeight: 260,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18
  },
  hint: {
    backgroundColor: C.panel,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 18,
    padding: 15,
    width: '100%',
    marginTop: 28
  },
  hintText: {
    color: C.light,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 13
  },
  tile: {
    backgroundColor: C.panel2,
    borderWidth: 2,
    borderColor: C.pink,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: C.pink,
    shadowOpacity: 0.65,
    shadowRadius: 22,
    elevation: 12
  },
  footer: {
    textAlign: 'center',
    color: '#886E98',
    fontSize: 11,
    marginVertical: 12
  }
});
