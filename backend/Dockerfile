FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN mkdir -p /app/public/uploads && \
    chmod -R 777 /app/public

ENV NODE_ENV=development

EXPOSE 1337

CMD ["npm", "run", "develop"]
