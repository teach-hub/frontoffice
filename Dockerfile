FROM node:16.20-slim

ADD ./src /teachhub-frontoffice/src/
ADD ./public /teachhub-frontoffice/public/
ADD ./package.json /teachhub-frontoffice/
ADD ./package-lock.json /teachhub-frontoffice/
ADD ./tsconfig.json /teachhub-frontoffice/
ADD ./babel-plugin-macros.config.js /teachhub-frontoffice/
ADD ./relay.config.js /teachhub-frontoffice/
ADD ./.env.example /teachhub-frontoffice/.env

WORKDIR /teachhub-frontoffice/

RUN npm ci && npm run build

ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ENV REACT_APP_GITHUB_CLIENT_ID=$REACT_APP_GITHUB_CLIENT_ID
ENV REACT_APP_GITHUB_SCOPE=$REACT_APP_GITHUB_SCOPE

# Emulamos un segundo stage "limpio".
# RUN rm -rf ./node_modules

# Queremos que el build corra como dev
# (ahi tenemos las dependencias para buildear todo).

RUN echo "Using node_env $NODE_ENV"

# Entrypoint custom

ENTRYPOINT ["/bin/sh", "-c", "npx runtime-env-cra && mv runtime-env.js build && npx serve -s build"]

