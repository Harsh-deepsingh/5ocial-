FROM node:20.12.0-alpine3.19

# ARG DATABASE_URL
# ARG JWT_SECRET
# ARG NEXTAUTH_SECRET
# ARG NEXTAUTH_URL

ENV JWT_SECRET=secrets
ENV NEXTAUTH_SECRET=password_nextauth
ENV NEXTAUTH_URL="http://35.183.244.189:3000"
ENV DATABASE_URL="postgresql://neondb_owner:j1LKDIsJb5xH@ep-dry-waterfall-a5qtjwc7.us-east-2.aws.neon.tech/neondb?sslmode=require"

WORKDIR /app

COPY package* . 
COPY tsconfig.json . 
COPY ./prisma . 


RUN npm install
RUN DATABASE_URL=$DATABASE_URL npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
