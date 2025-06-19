# Ejercicio Ejércitos

Un simulador de batallas entre ejércitos medievales implementado en JavaScript.

## Descripción

Este proyecto simula batallas entre diferentes civilizaciones (Chinos, Ingleses y Bizantinos) con diferentes tipos de unidades militares:

- **Lanceros (Pikemen)**: Unidades básicas con fuerza 5
- **Arqueros (Archers)**: Unidades intermedias con fuerza 10
- **Caballeros (Knights)**: Unidades élite con fuerza 20

Cada ejército puede:

- Entrenar unidades para aumentar su fuerza
- Transformar unidades (Lancero → Arquero → Caballero)
- Atacar a otros ejércitos
- Gestionar recursos de oro

## Requisitos

- Node.js (versión 12 o superior)

## Cómo ejecutar

1. Clona o descarga este repositorio
2. Navega al directorio del proyecto:
   ```bash
   cd ejercicio-ejercitos
   ```
3. Ejecuta el archivo principal:
   ```bash
   node index.js
   ```

## Funcionalidades

- Simulación de batallas automáticas entre ejércitos
- Sistema de entrenamiento y transformación de unidades
- Gestión de recursos (oro)
- Historial de batallas
- Sistema de edades para unidades y ejércitos

## Ejemplo de salida

El programa mostrará:

- Estado inicial de los ejércitos
- Resultados de las batallas
- Entrenamientos y transformaciones
- Historial de batallas
- Información de edades de las unidades

## Mecánicas del juego

- **Entrenamiento**: Mejora la fuerza de las unidades a un costo
- **Transformación**: Actualiza el tipo de unidad (cuesta más pero proporciona mejores unidades)
- **Batallas**: Los ejércitos luchan basándose en la comparación de fuerza total
- **Victoria**: El ganador obtiene oro, el perdedor pierde las unidades más fuertes
- **Empate**: Ambos ejércitos pierden una unidad cada uno

## Civilizaciones

Cada civilización comienza con diferentes composiciones de unidades:

- **Chinos**: 2 lanceros, 25 arqueros, 2 caballeros
- **Ingleses**: 10 lanceros, 10 arqueros, 10 caballeros
- **Bizantinos**: 5 lanceros, 8 arqueros, 15 caballeros
