FROM node:16

WORKDIR /app/client
COPY ./ ./
RUN yarn install --immutable

RUN yarn build
RUN npm install serve -g

CMD ["/bin/bash"]
