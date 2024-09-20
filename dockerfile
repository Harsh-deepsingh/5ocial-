FROM node:20.12.0-alpine3.19

ARG DATABASE_URL
ARG JWT_SECRET
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL

WORKDIR /app


COPY package* . 
COPY tsconfig.json .
COPY ./prisma .

RUN npm install
RUN DATABASE_URL=$DATABASE_URL npx prisma generate

COPY . . 

RUN  DATABASE_URL=$DATABASE_URL npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
