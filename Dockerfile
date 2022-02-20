FROM node:16-alpine as build

ARG BUILDVERSION=0.0.0

WORKDIR /app

# Copy dependency files
COPY ./package.json ./

# Clean install depdenencies
RUN npm i --silent

# Copy the rest of the files
COPY ./ .

# Build the application
RUN npm run build

# Put together the release image with the just build artifacts
FROM node:16-alpine

WORKDIR /app

# Copy dependency files
COPY ./package.json ./

# Clean install production-only dependencies
RUN npm i --silent --only=production

# Copy built project
COPY --from=build /app/dist ./

EXPOSE 80

CMD [ "node", "index.js" ]