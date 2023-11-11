<<<<<<< HEAD
FROM node:20

WORKDIR /

COPY package* .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]



=======
FROM node:20

WORKDIR /

COPY package* .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]



>>>>>>> 4651486 (Deploy Project)
