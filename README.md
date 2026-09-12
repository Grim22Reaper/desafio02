# Taqueria Marina

link del video demostrativo: https://drive.google.com/file/d/1Hjshaogi9x2PRH3SNqH0Dg7waCmgYMgz/view?usp=sharing

Aplicacion movil desarrollada en React Native con Expo y TypeScript para la gestion de pedidos de una taqueria, disenada como proyecto universitario para la Universidad Don Bosco (UDB).

## Descripcion General

Taqueria Marina permite a los usuarios registrarse, iniciar sesion, explorar un catalogo organizado de alimentos y bebidas, administrar un carrito de compras con calculo automatico de subtotales e impuestos, y consultar un historial persistente de todas las ordenes confirmadas mediante el uso de almacenamiento local.

## Arquitectura y Estructura del Proyecto

El proyecto esta organizado de manera modular separando la logica de navegacion, las pantallas de la interfaz de usuario y los datos estaticos:

/
├── App.tsx                  # Enrutador principal y manejo de estados globales
├── src/
    ├── data/
    │   └── menuData.ts      # Definicion de productos, precios, categorias e imagenes
    └── screens/
        ├── LoginScreen.tsx      # Autenticacion de usuarios
        ├── RegisterScreen.tsx   # Registro de nuevas cuentas
        ├── CatalogScreen.tsx    # Visualizacion de productos por secciones y control de cantidades
        ├── OrdenScreen.tsx      # Resumen del carrito, calculo de IVA y confirmacion de orden
        └── HistorialScreen.tsx  # Consulta de compras pasadas guardadas localmente

## Caracteristicas Principales

* Autenticacion Local: Sistema de ingreso para administradores y registro de nuevos usuarios respaldado mediante AsyncStorage.
* Catalogo Dinamico: Listado de platillos y bebidas filtrados por secciones utilizando componentes optimizados (SectionList).
* Validador Hibrido de Imagenes: Soporte para recursos locales e imagenes mediante URLs remotas para garantizar estabilidad en diferentes entornos de ejecucion.
* Carrito Interactivo: Controles de incremento, decremento y eliminacion automatica de productos cuando la cantidad llega a cero.
* Calculo Financiero Automatico: Computo en tiempo real de subproductos, aplicacion de impuesto IVA (13%) y total general.
* Persistencia de Datos: Almacenamiento local asincrono del historial de ordenes y sesiones utilizando @react-native-async-storage/async-storage.

## Requisitos del Sistema

* Node.js (version LTS recomendada)
* Expo CLI / Expo Go (para ejecucion en dispositivo fisico o emulador de Android)

## Instalacion y Ejecucion

1. Clonar o descargar el repositorio en tu computadora.
2. Instalar las dependencias del proyecto ejecutando el siguiente comando en la terminal:
   npm install
3. Instalar las librerias requeridas para almacenamiento local:
   npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
4. Iniciar el servidor de desarrollo de Expo:
   npx expo start
5. Escanear el codigo QR generado con la aplicacion Expo Go en tu dispositivo movil o presionar la tecla "a" para abrirlo en un emulador local de Android.
