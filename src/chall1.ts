import Router from "@koa/router";

export default function makeChallenge1(router: Router) {
  router.get("/1b732e62-b4b6-5f12-8e53-f66b7e617021/hello-world", (ctx) => {
    ctx.redirect("/1b732e62-b4b6-5f12-8e53-f66b7e617021/challenge1.jpg");
  });
}
