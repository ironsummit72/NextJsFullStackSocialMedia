FROM node:22.0.0
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
ENV NEXT_PUBLIC_BASE_URL=http://localhost:5002
ENV BASE_URL=http://localhost:5002
EXPOSE 3000
CMD ["npm", "start"]

