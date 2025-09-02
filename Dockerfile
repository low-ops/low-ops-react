FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
COPY nginx.conf ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine
RUN mkdir -p /usr/share/nginx/html/
COPY --from=build /app/dist/ /usr/share/nginx/html/
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

# Copy Nginx configuration file

# Copy SSL certificate and key to a secure location in the container
#COPY certificate.cer /etc/nginx/ssl/certificate.cer
#COPY certificate.key /etc/nginx/ssl/certificate.key

EXPOSE 8000