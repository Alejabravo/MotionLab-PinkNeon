
import React from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';

import {
  NavigationContainer,
  DarkTheme
} from '@react-navigation/native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';

import {
  GestureHandlerRootView
} from 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';

import { C } from './src/components/UI';

import Home from './src/screens/Home';
import DragRotate from './src/screens/DragRotate';
import Loading from './src/screens/Loading';
import Multitouch from './src/screens/Multitouch';
import Bounce from './src/screens/Bounce';
import Carousel from './src/screens/Carousel';
import Accelerometer from './src/screens/Accelerometer';

const Drawer = createDrawerNavigator();

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: C.bg,
    card: C.panel,
    text: C.white,
    primary: C.pink,
    border: C.line
  }
};

function CustomDrawer(props) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: C.bg
      }}
    >
      <View style={s.profile}>
        <Text style={s.avatar}></Text>

        <Text style={s.name}>
          MotionLab ✦
        </Text>

        <Text style={s.tag}>
          Explora, interactúa y anima
        </Text>
      </View>

      <DrawerItemList {...props} />

      <View style={s.bottom}>
        <Text style={s.bottomText}>
           Pink Neon Edition
        </Text>

        <Text style={s.bottomSub}>
          React Native · Expo · Reanimated
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={theme}>
        <StatusBar style="light" />

        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => (
            <CustomDrawer {...props} />
          )}
          screenOptions={{
            headerStyle: {
              backgroundColor: C.bg,
              elevation: 0,
              shadowOpacity: 0
            },
            headerTintColor: C.light,
            headerTitleStyle: {
              color: C.white,
              fontWeight: '800'
            },
            drawerStyle: {
              backgroundColor: C.bg,
              width: 290
            },
            drawerActiveBackgroundColor: '#5A1F56',
            drawerActiveTintColor: C.light,
            drawerInactiveTintColor: C.white,
            drawerLabelStyle: {
              fontSize: 14,
              fontWeight: '700'
            },
            sceneStyle: {
              backgroundColor: C.bg
            }
          }}
        >
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Inicio ',
              headerTitle: 'MotionLab ✦'
            }}
          />

          <Drawer.Screen
            name="DragRotate"
            component={DragRotate}
            options={{
              title: ' Arrastrar y rotar'
            }}
          />

          <Drawer.Screen
            name="Loading"
            component={Loading}
            options={{
              title: ' Carga animada'
            }}
          />

          <Drawer.Screen
            name="Multitouch"
            component={Multitouch}
            options={{
              title: ' Gestos multitáctiles'
            }}
          />

          <Drawer.Screen
            name="Bounce"
            component={Bounce}
            options={{
              title: ' Rebote'
            }}
          />

          <Drawer.Screen
            name="Carousel"
            component={Carousel}
            options={{
              title: ' Carrusel animado'
            }}
          />

          <Drawer.Screen
            name="Accelerometer"
            component={Accelerometer}
            options={{
              title: ' Acelerómetro'
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const s = StyleSheet.create({
  profile: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: '#27132F',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.line
  },
  avatar: {
    fontSize: 60
  },
  name: {
    color: C.white,
    fontSize: 26,
    fontWeight: '900',
    marginTop: 7
  },
  tag: {
    color: C.light,
    fontSize: 12,
    marginTop: 5
  },
  bottom: {
    marginTop: 'auto',
    padding: 22,
    borderTopWidth: 1,
    borderTopColor: C.line
  },
  bottomText: {
    color: C.light,
    fontWeight: '900'
  },
  bottomSub: {
    color: C.muted,
    fontSize: 11,
    marginTop: 5
  }
});
