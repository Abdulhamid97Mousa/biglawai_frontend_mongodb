FROM node:18

# Create app directory
WORKDIR /app

# copy files needed for the install
COPY package.json yarn.lock ./

# install dependencies
RUN yarn install --frozen-lockfile

# copy app source
COPY . .

# build the application
RUN yarn prisma generate && yarn next build

EXPOSE 3000

CMD ["yarn", "start"]