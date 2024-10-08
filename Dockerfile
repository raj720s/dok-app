FROM node:alpine3.18 as build
WORKDIR /app
#build
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build


#nginx 
FROM nginx:1.23.3-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf /*
COPY --from=dist /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
