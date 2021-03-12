FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production
COPY . .
RUN npm run build

FROM nginx:1.12-alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/extra-conf.d/nginx-proxy.conf

ARG BACKEND_URL
RUN sed -i "s/{backendurl}/http:\/\/${BACKEND_URL}/g" /etc/nginx/extra-conf.d/nginx-proxy.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
