FROM node:12

# Create app directory
WORKDIR /usr/app

COPY package*.json ./

RUN npm install
COPY . .

RUN npm install -g nodemon

EXPOSE 1337
CMD [ "nodemon", "app", "-L" ]
#CMD ["./wait-for-it.sh", "logstash:8089", "--", "node", "app"]
#./wait-for-it.sh db:3306 --timeout=90 -- npx sequelize-cli db:migrate
