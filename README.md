# MotionLab | Pink Neon

**Explorando el movimiento a través de React Native**

MotionLab es una aplicación móvil desarrollada con **React Native, Expo y Reanimated**, diseñada para demostrar diferentes técnicas de animación e interacción en dispositivos móviles.

El proyecto reúne seis experiencias interactivas en una sola aplicación, con navegación lateral y una interfaz visual personalizada en tonos rosados, morados y oscuros.

---

## Sobre el proyecto

MotionLab nace como una propuesta académica para aplicar conceptos de animación, manejo de gestos, interacción táctil y sensores móviles.

Más allá de implementar las funcionalidades solicitadas, el objetivo fue crear una experiencia visual atractiva, intuitiva y dinámica.

La versión **Pink Neon Edition** incorpora una pantalla de inicio con seis miniilustraciones animadas que representan las funcionalidades disponibles.

## Experiencias interactivas

| Módulo | Descripción |
|---|---|
| **Drag & Rotate** | Permite arrastrar un gato por la pantalla, modificando su rotación según la dirección del desplazamiento. |
| **Infinite Loading** | Combina un indicador de carga infinito con una barra de progreso animada. |
| **Multitouch** | Permite ampliar, reducir, mover y rotar una fotografía mediante gestos táctiles. |
| **Elastic Bounce** | Aplica una reducción de escala al presionar una figura y un efecto de rebote al soltarla. |
| **Animated Carousel** | Presenta tarjetas desplazables horizontalmente con transiciones de escala y rotación. |
| **Shake Detection** | Utiliza el acelerómetro del dispositivo para activar una animación al detectar una sacudida. |

### Navegación

La aplicación utiliza **React Navigation Drawer**, permitiendo acceder de forma independiente a cada ejercicio desde un menú lateral.

## Diseño e interfaz

La identidad visual de MotionLab está basada en el concepto **Pink Neon Edition**.

Sus principales características son:

- Paleta de colores rosados, morados y fondos oscuros.
- Tarjetas interactivas con bordes y detalles neón.
- Miniilustraciones animadas en la pantalla principal.
- Elementos visuales inspirados en gatos.
- Distribución organizada para dispositivos móviles.

La interfaz busca integrar creatividad y funcionalidad sin perder la claridad de navegación.

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React Native | Desarrollo de la aplicación móvil |
| Expo | Entorno de desarrollo y ejecución |
| React Native Reanimated | Animaciones y transiciones |
| React Native Gesture Handler | Reconocimiento de gestos táctiles |
| React Navigation | Navegación Drawer |
| Expo Sensors | Acceso al acelerómetro del dispositivo |
| JavaScript | Implementación de componentes y lógica |

## Estructura del proyecto

```text
MotionLab/
├── App.js
├── app.json
├── babel.config.js
├── index.js
├── package.json
├── package-lock.json
└── src/
    ├── assets/
    │   └── mis gatas.jpg
    ├── components/
    │   └── UI.js
    └── screens/
        ├── Home.js
        ├── DragRotate.js
        ├── Loading.js
        ├── Multitouch.js
        ├── Bounce.js
        ├── Carousel.js
        └── Accelerometer.js
```

## Instalación y ejecución

Para ejecutar el proyecto, es necesario contar con Node.js, npm y Expo Go o un entorno de emulación compatible.

**Clonar el repositorio**

```bash
git clone https://github.com/Alejabravo/MotionLab-PinkNeon.git
```

**Ingresar al proyecto**

```bash
cd MotionLab-PinkNeon
```

**Instalar dependencias**

```bash
npm install
```

**Iniciar Expo**

```bash
npx expo start
```

Una vez iniciado el servidor, escanear el código QR utilizando Expo Go.

Se recomienda utilizar un dispositivo físico para comprobar correctamente los gestos multitáctiles y la detección de sacudidas mediante el acelerómetro.

## Pruebas y funcionamiento

Las seis funcionalidades fueron ejecutadas y verificadas durante el desarrollo de la aplicación.

La barra de progreso corresponde a una demostración visual y no representa una descarga real. La fotografía utilizada en el módulo Multitouch se encuentra almacenada localmente dentro del proyecto.

## Repositorio

**GitHub:** https://github.com/Alejabravo/MotionLab-PinkNeon

---59

**MotionLab – Pink Neon**
