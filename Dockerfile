FROM node:18-alpine

WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias y limpia la caché
RUN npm install --force && \
    npm cache clean --force

# Copia el resto del código
COPY . .

# Expone el puerto configurado en Vite
EXPOSE 8080

# Inicia la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]