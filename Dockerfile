FROM node AS build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:1.25

WORKDIR /var/www/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /etc/nginx/ssl

RUN openssl req -x509 -nodes -days 365 \
    -subj "/C=KR/L=Seoul/O=42Seoul/CN=42foryou" \
		-addext "subjectAltName=DNS:42foryou.com" \
    -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/42foryou.key \
    -out /etc/nginx/ssl/42foryou.crt;

COPY --from=build /app/dist ./dist

EXPOSE 443 80