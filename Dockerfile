FROM node:20


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .

# Expõe a porta usada na aplicação
EXPOSE 3333

CMD ["npm", "run", "dev"]
