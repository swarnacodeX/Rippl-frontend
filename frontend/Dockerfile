FROM node:20-alpine
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT 5173
EXPOSE 5173
CMD [ "npm","start" ]
