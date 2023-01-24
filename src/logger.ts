import pino from "pino";

const logger = pino({
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
        level: "info",
      },
      {
        target: 'pino-tee',
        options: {
          filters: {
            info: '/var/logs/info.log',
            warn: '/var/logs/warn.log'
          }
        },
        level: "info"
      }
    ],
  },
  redact: {
    paths: ["req['headers']", "res['headers']"],
  },
});

export default logger;
