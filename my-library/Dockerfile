FROM node:16

WORKDIR /app/client
COPY ./ ./
RUN yarn install --frozen-lockfile

RUN yarn build
RUN npm install serve -g

CMD ["/bin/bash"]
