# MotionLab ✨

Aplicación móvil educativa desarrollada con **Expo**, **React Native**, **Reanimated** y **Gesture Handler**. Integra seis ejercicios de animación y un menú Drawer para acceder a cada uno.

## Funcionalidades

- Arrastrar una figura con rotación direccional.
- Spinner infinito y barra de progreso animada.
- Gestos simultáneos de arrastre, zoom y rotación sobre una imagen.
- Efecto bounce al presionar y soltar.
- Carrusel horizontal con escalado y rotación.
- Detección de sacudidas con acelerómetro y animación.
- Navegación lateral con React Navigation Drawer.

## Instalación

Requisitos: Node.js LTS, npm, Expo Go en Android/iOS o emulador.

```bash
npm install
npx expo install --fix
npx expo start --clear
```

Escanea el QR con Expo Go. Para probar el acelerómetro y los gestos multitouch, utiliza un teléfono real.

## Estructura

- `App.js`: navegación Drawer.
- `src/screens/`: seis ejercicios y pantalla de inicio.
- `src/components/UI.js`: estilos compartidos.

## Notas

La barra de progreso es una demostración animada, no representa una descarga real. La imagen multitouch se obtiene de Unsplash y necesita conexión a Internet. El umbral de detección de sacudidas puede ajustarse en `Accelerometer.js`.

## Publicación

Crea un repositorio público en GitHub y ejecuta:

```bash
git init
git add .
git commit -m "Implementar MotionLab con seis ejercicios de animacion"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/MotionLab.git
git push -u origin main
```

Reemplaza `TU_USUARIO` por tu usuario real.
