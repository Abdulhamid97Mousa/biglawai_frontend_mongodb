FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# copy files needed for the install
COPY ["package.json", "yarn.lock"]

# RUN yarn install
# If you are building your code for production
RUN rm -rf node_modules && yarn install --frozen-lockfile

# Bundle app source
COPY . .

EXPOSE 3000

CMD yarn run dev