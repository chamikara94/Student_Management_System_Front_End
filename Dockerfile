#stage 1
FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# stage 2
FROM nginx:alpine AS stage-2
COPY --from=build /app/dist/front-end /user/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]



