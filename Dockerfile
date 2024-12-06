# Använd den officiella Node.js-bilden
FROM node:18

# Sätt arbetskatalogen i containern
WORKDIR /app

# Kopiera package.json och installera beroenden
COPY package.json ./
RUN npm install

# Kopiera hela koden och .env-filen
COPY . ./

# Bygg appen
RUN npm run build

# Installera serve för att serva appen
RUN npm install -g serve

# Exponera port 3000
EXPOSE 3000

# Kör appen
CMD ["serve", "-s", "build"]