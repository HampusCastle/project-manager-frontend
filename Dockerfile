# Byggfas
FROM node:18-alpine AS build

WORKDIR /app

# Kopiera package.json och package-lock.json för att cachea installationen av beroenden
COPY package*.json ./

# Installera beroenden
RUN npm install

# Kopiera all källkod
COPY ./ ./

# Bygg produktionen
RUN npm run build

# Körfas
FROM nginx:alpine

# Sätt arbetskatalog
WORKDIR /usr/share/nginx/html

# Ta bort NGINX-standardfiler
RUN rm -rf ./*

# Kopiera byggda filer från byggfasen
COPY --from=build /app/build .

# Anpassad NGINX-konfiguration (om nödvändigt för React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponera porten för frontend
EXPOSE 80

# Starta NGINX
CMD ["nginx", "-g", "daemon off;"]
