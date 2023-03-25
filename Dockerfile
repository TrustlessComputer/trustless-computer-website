# build environment
FROM node:16 as build
ARG BUILD_ENV=production

WORKDIR /app
COPY package.json ./
COPY yarn.lock* ./
RUN yarn install

COPY . ./

# https://create-react-app.dev/docs/adding-custom-environment-variables#what-other-env-files-can-be-used
COPY envs/.env.${BUILD_ENV} .env

RUN yarn build

# production environment
FROM nginx:stable
COPY --from=build /app/dist /usr/share/nginx/html
# new
COPY etc/nginx/nginx-docker.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
