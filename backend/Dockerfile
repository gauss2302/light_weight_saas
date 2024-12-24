FROM node:16-alpine

WORKDIR /usr/src/app

# Install nodemon globally
RUN npm install -g nodemon

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

EXPOSE 5489

CMD ["npm", "run", "dev"]