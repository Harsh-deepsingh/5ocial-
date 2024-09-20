FROM node:20.12.0-alpine3.19

WORKDIR /app

COPY package* . 
COPY tsconfig.json .
COPY ./prisma .

RUN npm install
RUN npx prisma generate

COPY . . 

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
