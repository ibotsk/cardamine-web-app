FROM node:10-slim as build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production
COPY . .
RUN npm run build

FROM nginx:1.12-alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
COPY ./nginx-config/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx-config/extra /etc/nginx/extra-conf.d

ARG BACKEND_URL
ARG SSL_CRT_FILE
ARG SSL_KEY_FILE
ARG SSL_PROXY_CRT_FILE
ARG SSL_PROXY_KEY_FILE

RUN sed -i "s/{ssl_crt_file}/${SSL_CRT_FILE}/g; s/{ssl_key_file}/${SSL_KEY_FILE}/g" /etc/nginx/conf.d/default.conf && \
    sed -i "s/{backendurl}/${BACKEND_URL}/g; s/{ssl_proxy_crt_file}/${SSL_PROXY_CRT_FILE}/g; s/{ssl_proxy_key_file}/${SSL_PROXY_KEY_FILE}/g" /etc/nginx/extra-conf.d/nginx-proxy.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
