# Music App - Clon de Spotify

Aplicación web que replica las funcionalidades principales de Spotify, construida con Angular 17 y la API de Spotify.

## ⚡ Características

- Autenticación con Spotify
- Búsqueda de artistas
- Reproductor de música con control de volumen
- Vista detallada de artistas y álbumes
- Diseño responsive basado en Tailwind CSS
- Manejo de estado con Signals de Angular

## 🚀 Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/santiagohm002/Music-app.git
cd Music-app
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
```typescript
export const environment = {
  production: false,
  spotifyApiUrl: 'https://api.spotify.com/v1',
  spotifyConfig: {
    clientId: '915fb75539bd4c03b6ddbe6ac80a4d0a',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    redirectUri: 'http://localhost:4200/callback',
    scopes: [
      'user-read-private',
      'user-read-email',
      'playlist-read-private',
      'streaming'
    ]
  }
};
```

4. Iniciar el servidor de desarrollo
```bash
ng serve
```

## 🎨 Diseño

El diseño está inspirado en la interfaz actual de Spotify, implementado con:
- Tailwind CSS para estilos
- Sistema de diseño personalizado
- Modo oscuro nativo
- Animaciones y transiciones fluidas

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

## 🌿 Ramas

- `main`: Producción
- `desarrollo`: Desarrollo principal
- `caracteristica/autenticacion`: Sistema de login
- `caracteristica/reproductor`: Reproductor de música
- `caracteristica/busqueda`: Búsqueda de artistas

## 🛠️ Tecnologías

- Angular 17
- Tailwind CSS
- RxJS
- API de Spotify
- Angular Signals

## 👤 Autor

- [Santiago Hernández](https://github.com/santiagohm002)
