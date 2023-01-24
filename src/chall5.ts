import Router from "@koa/router";
import { createHash } from "crypto";

export default function makeChallenge5(router: Router) {
  router.get("/026112df-fb46-5a23-af57-e79259c6fe50", (ctx) => {
    ctx.redirect("/026112df-fb46-5a23-af57-e79259c6fe50/challenge5.html");
  });
  router.get("/e87f5e87-60aa-4176-ab06-a18463fc84d7", (ctx) => {
    const preHasher = createHash("md5");
    preHasher.update(ctx.ip);
    const hasher = createHash(
      preHasher.digest()[0] > 128 ? "blake2b512" : "blake2s256"
    );
    hasher.update(Math.floor(Date.now() / 1000 / 60 / 15).toString(2));
    ctx.body =
      "这题目哪有那么简单，再送你个没用的信息：" +
      hasher.digest("hex") +
      "<END>";
  });
}
