FROM node:16
WORKDIR /ingreso
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]