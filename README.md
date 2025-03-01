# Clon de Spotify con Angular 17

Una aplicación web que replica las funcionalidades principales de Spotify, construida con Angular 17 y la API de Spotify.

## 🚀 Características

- Autenticación con Spotify
- Búsqueda de artistas
- Reproducción de previsualizaciones
- Vista de álbumes y artistas
- Diseño responsive
- Interfaz moderna con Tailwind CSS

## 🛠️ Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/spotify-clone-angular.git
cd spotify-clone-angular
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
   - Renombrar `environment.example.ts` a `environment.ts`
   - Añadir tu Client ID de Spotify

4. Iniciar el servidor de desarrollo
```bash
ng serve
```

5. Navegar a `http://localhost:4200`

## 🎨 Diseño UI

Este proyecto está basado en el siguiente kit de UI de Figma:
[Spotify UI Kit](https://www.figma.com/community/file/1108011669320248290/spotify-ui-kit)

## 🌿 Estructura de Ramas

- `main`: Rama principal de producción
- `develop`: Rama de desarrollo
- `feature/*`: Ramas para nuevas características
  - `feature/auth`: Autenticación
  - `feature/player`: Reproductor de música
  - `feature/search`: Búsqueda
  - `feature/artist`: Vista de artista
- `hotfix/*`: Correcciones urgentes

## 📦 Estructura del Proyecto

```
src/
├── app/
│   ├── core/              # Servicios centrales, guardias e interceptores
│   ├── features/          # Componentes principales por funcionalidad
│   └── shared/           # Componentes y utilidades compartidas
├── assets/              # Recursos estáticos
└── environments/        # Configuración por entorno
```

## 🤝 Contribución

1. Crear una rama desde `develop`
2. Nombrar la rama según la característica: `feature/nombre-caracteristica`
3. Realizar cambios siguiendo las guías de estilo
4. Crear Pull Request hacia `develop`

## 📝 Convenciones de Commits

```
feat: Nueva característica
fix: Corrección de error
docs: Cambios en documentación
style: Cambios de estilo
refactor: Refactorización de código
test: Cambios en pruebas
```

## 🔑 Configuración de Spotify

1. Crear una aplicación en [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Configurar URL de redirección: `http://localhost:4200/callback`
3. Copiar Client ID a environment.ts

## 👥 Autor

- [Tu Nombre](https://github.com/tu-usuario)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles
