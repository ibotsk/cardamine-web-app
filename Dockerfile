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
RUN sed -i "s/{backendurl}/${BACKEND_URL}/g" /etc/nginx/extra-conf.d/nginx-proxy.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
