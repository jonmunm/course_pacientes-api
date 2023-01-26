# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
#"/bin/sh", "NODE_ENV=Production", "node", "app.js"

#"/bin/sh", "NODE_ENV=Production", "node", "app.js"
#[ "/bin/sh", "-c", "NODE_ENV=Production", "node", "/app/app.js" ]
#[ "/bin/bash", "NODE_ENV=Production", "node", "/app/app.js" ]
#[ "/bin/bash", "NODE_ENV=Production", "node", "app.js" ]