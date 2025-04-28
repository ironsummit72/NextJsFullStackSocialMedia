FROM node:22.0.0 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm i typescript -g
COPY . .
RUN npm run build

EXPOSE 5002


FROM node:22.0.0
WORKDIR /production
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./
RUN npm install --production
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
# COPY --from=build /app/.env ./.env
EXPOSE 5002
CMD ["npm", "start"]