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
ENTRYPOINT [ "sh", "-c", "yarn start | tee /var/log/stdout.log" ]
EXPOSE 3000
