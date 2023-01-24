import { Request } from "koa";
import jwt from "jsonwebtoken";
import logger from "./logger.js";
import { randomUUID } from "crypto";

const JWT_SECRET =
  "~,odn/`{UT*{QC[S@Xpt95yaCc\\sA-o_f[ANwKm-'p!2\\-M.]*b%2}pM=pR@\\zVR?.?5>Z*c%,>gx<Q#D\\-%\\3[\"\\3#2Z ? [, z > q &@v(xo94w = Hs: K'A@e}<\\($sP?;#L";

export function signToken(req: Request, name: string, email: string): string {
  const payload = {
    name,
    email,
    agent: req.headers["user-agent"],
    roles: ["player"],
    entitlements: ["winner"],
    toe: Math.floor(Date.now() / 1000),
    txn: randomUUID(),
  };
  const options: jwt.SignOptions = {
    issuer: "Veins Backend",
    subject: req.ip,
    expiresIn: "30 days",
  };
  const token = jwt.sign(payload, JWT_SECRET, options);
  logger.info({ payload, options, token }, "signed token");
  return token;
}
