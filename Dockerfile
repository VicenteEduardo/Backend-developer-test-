# Usa imagem oficial do Node
FROM node:20

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta usada na aplicação
EXPOSE 3333

# Comando padrão
CMD ["npm", "run", "dev"]
