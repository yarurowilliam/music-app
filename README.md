# Music App - Clon de Spotify

Aplicación web que replica las funcionalidades principales de Spotify, construida con Angular 17 y la API de Spotify.

## 📋 Requisitos Previos

### Configuración de Spotify Developer (Requerido)
1. Ve a [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Inicia sesión o crea una cuenta
3. Crea una nueva aplicación:
   - Click en "Create App"
   - Completa el formulario
   - En "Redirect URI" agrega: `http://localhost:4200/callback`
   - Guarda la configuración
4. Obtén las credenciales:
   - Copia el "Client ID" (lo necesitarás en la instalación)
   - **IMPORTANTE**: Sin estas credenciales, la aplicación no funcionará

### Requisitos Técnicos
- Node.js 18 o superior
- NPM o Yarn
- Angular CLI 17

## 🚀 Instalación

1. Clona el repositorio
```bash
git clone https://github.com/yarurowilliam/music-app.git
cd music-app
```

2. Instala las dependencias
```bash
npm install
```

3. Configura las variables de entorno:
   - Crea dos archivos basados en `environment.example.ts`:
     - `src/environments/environment.ts`
     - `src/environments/environment.prod.ts`
   - En ambos archivos, reemplaza `YOUR_CLIENT_ID` con tu Client ID de Spotify

```typescript
export const environment = {
  production: false,
  spotifyApiUrl: 'https://api.spotify.com/v1',
  spotifyConfig: {
    clientId: 'YOUR_CLIENT_ID', // <- Reemplaza con tu Client ID
    authEndpoint: 'https://accounts.spotify.com/authorize',
    redirectUri: 'http://localhost:4200/callback',
    scopes: [
      'user-read-private',
      'user-read-email',
      'playlist-read-private',
      'playlist-read-collaborative',
      'user-library-read',
      'user-top-read',
      'user-read-recently-played'
    ]
  }
};
```

4. Inicia la aplicación
```bash
ng serve
```

5. Abre tu navegador en `http://localhost:4200`

## 🎨 Diseño

El diseño está inspirado en la interfaz moderna de Spotify, siguiendo el diseño de la comunidad en Figma:

### Referencias de Diseño
- [Spotify UI Design en Figma](https://www.figma.com/design/zJegBUDw6579hmsXfqMujc/Spotify-UI-(Community))
  - Diseño moderno y minimalista
  - Sistema de navegación lateral
  - Reproductor persistente en la parte inferior
  - Paleta de colores oscura con acentos verdes
  - Cards y grids para mostrar contenido

### Características del Diseño
- **Tema Oscuro**: Diseño con modo oscuro nativo (#121212 como color base)
- **Sistema de Grid**: Layout responsive con cards de 4 columnas
- **Navegación**: Sidebar fijo con navegación principal
- **Player**: Reproductor fijo en la parte inferior
- **Tipografía**: Sistema de fuentes similar a Spotify
- **Iconografía**: Set de iconos minimalista

### Inspiración del Proyecto
- [Diseño Actual de Spotify](https://open.spotify.com/)
- [Documentación de la API de Spotify](https://developer.spotify.com/documentation/web-api)
- [Guía de Diseño de Spotify](https://developer.spotify.com/documentation/general/design-and-branding/)

## 📁 Estructura

```
src/
├── app/
│   ├── core/           # Servicios, guardias e interceptores
│   ├── features/       # Componentes principales
│   └── shared/         # Componentes reutilizables
├── assets/            # Recursos estáticos
└── environments/      # Configuración
```

## 🛠️ Tecnologías

- Angular 17
- Tailwind CSS
- RxJS
- API de Spotify
- Angular Signals

## 🐳 Docker

Para ejecutar la aplicación en un contenedor Docker, sigue estos pasos:

1. Construye la imagen Docker:
```bash
docker build -t music-app . 
```

2. Ejecuta el contenedor:
```bash
docker run -p 4200:80 music-app
```

3. Abre tu navegador y navega a `http://localhost:4200`.

## 👤 Autor

- [William Yaruro](https://github.com/yarurowilliam)