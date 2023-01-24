FROM docker.io/library/node:current-alpine AS builder
ADD public /src/public
ADD src /src/src
ADD ["./package.json", "./LICENSE", "./tsconfig.json", "/src/"]
WORKDIR /src
RUN yarn install
RUN yarn build

FROM docker.io/library/node:current-alpine
COPY --from=builder /src /app
WORKDIR /app
ENTRYPOINT [ "yarn", "start" ]
EXPOSE 3000
