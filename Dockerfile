# build environment
FROM node:18 as base

FROM base AS deps

WORKDIR /app
COPY package.json ./
COPY yarn.lock* ./
RUN yarn install

# 2. Rebuild the source code only when needed
FROM base AS builder

ARG BUILD_ENV=production
WORKDIR /app

# Build client
COPY . ./
# https://create-react-app.dev/docs/adding-custom-environment-variables#what-other-env-files-can-be-used
COPY envs/.env.${BUILD_ENV} .env
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# Build server
RUN yarn server:build
COPY server/envs/.env.${BUILD_ENV} server-dist/.env
RUN yarn server:start

# production environment
FROM nginx:stable as runner
COPY --from=builder /app/dist /usr/share/nginx/html

COPY etc/nginx/nginx-docker.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
