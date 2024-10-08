FROM node:alpine3.18 as build
# env vars 
ARG REACT_APP_BASE_URL
# set env vars
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL

#build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

#nginx 
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf /*
COPY --from=dist /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
