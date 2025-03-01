# Etapa 1: Construcción
FROM node:14 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Etapa 2: Servidor Nginx
FROM nginx:alpine

COPY --from=build /app/dist/music-app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
