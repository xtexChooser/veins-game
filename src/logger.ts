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
    ],
  },
  redact: {
    paths: ["req['headers']", "res['headers']"],
  },
});

export default logger;
