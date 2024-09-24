FROM node:20.12.0-alpine3.19

ARG DATABASE_URL

ENV JWT_SECRET=${JWT_SECRET}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}

RUN echo JWT_SECRET=${JWT_SECRET}
RUN echo NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
RUN echo NEXTAUTH_URL=${NEXTAUTH_URL}
RUN echo DATABASE_URL

WORKDIR /app


COPY package* . 
COPY tsconfig.json .
COPY ./prisma .

RUN npm i sharp
RUN DATABASE_URL=${DATABASE_URL} npx prisma generate

COPY . . 

RUN  npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]