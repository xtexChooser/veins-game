import pino from "pino";

const logger = pino({
  redact: {
    paths: ["req['headers']", "res['headers']"],
  },
});

export default logger;
