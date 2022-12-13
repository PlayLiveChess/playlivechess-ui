# Fetching the latest node image on apline linux
FROM node:19-buster-slim AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /react-app


RUN npm install -g serve

# Copying all the files in our project
COPY build/ .

# Starting our application
CMD serve -s .
