
# FocusTrack – Frontend

Este es el frontend de **FocusTrack**, una aplicación web para visualizar el tiempo que los usuarios dedican a distintos dispositivos, apps o sitios web. Se centra en concienciar sobre el uso del tiempo frente a pantallas a través de estadísticas visuales.

## Tecnologías utilizadas

- React
- Vite
- CSS

## Requisitos previos

- [Node.js](https://nodejs.org/)

## Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd FOCUSTRACKFRONTEND
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Esto levantará la app en `http://localhost:5173` (puerto por defecto de Vite).

## Estructura del proyecto

```
FOCUSTRACKFRONTEND/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AddDevice/
│   │   ├── Dashboard/
│   │   ├── Login/
│   │   ├── NewActivityRecord/
│   │   ├── RecoverPassword/
│   │   ├── SignUp/
│   │   └── Statistics/
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   ├── index.css
│   └── variables.css
├── public/
├── vite.config.js
```

## Funcionalidades principales

- Registro e inicio de sesión
- Registro de actividades por dispositivo/app/web
- Visualización de estadísticas por día/semana
- Dashboard personalizado


## Autor

Desarrollado por angieccr12 - Sofiaflorezz.
