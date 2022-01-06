# pull official base image
FROM node:14.17.3-alpine

# set working directory
WORKDIR www/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH www/app/node_modules/.bin:$PATH

# add app
COPY . ./

RUN npm install --silent
RUN npm install react-scripts@5.0.0 -g --silent

# start app
CMD ["npm", "start"]
