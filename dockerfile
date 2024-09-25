FROM node:20.12.0-alpine3.19

# Declare build arguments
ARG DATABASE_URL
ARG JWT_SECRET
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL

# Set environment variables for runtime
ENV JWT_SECRET=${JWT_SECRET}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV DATABASE_URL=${DATABASE_URL}

# Check if the secrets are being passed properly
RUN echo "JWT_SECRET=${JWT_SECRET}"

WORKDIR /app

COPY package* . 
COPY tsconfig.json . 
COPY ./prisma . 

# Install dependencies and generate Prisma client
RUN npm install
RUN DATABASE_URL=$DATABASE_URL npx prisma generate

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
