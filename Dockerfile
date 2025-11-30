FROM node:20-alpine
WORKDIR /project-virtualenvironment

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app"]



