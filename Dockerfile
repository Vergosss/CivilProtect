FROM node:20.17.0
WORKDIR /app
COPY package*.json ./
#install dependencies asspecified in the copied package.json
RUN npm ci 
COPY . .
EXPOSE 3000
CMD ["npm","start"]