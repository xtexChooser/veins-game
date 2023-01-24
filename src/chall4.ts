import Router from "@koa/router";

export default function makeChallenge4(router: Router) {
  router.get("/203fb6d9_763c_55e6_906f_e678ac94e84c", (ctx) => {
    ctx.redirect("/203fb6d9-763c-55e6-906f-e678ac94e84c");
  });
  router.get("/203fb6d9-763c-55e6-906f-e678ac94e84c", (ctx) => {
    ctx.body = "[[wzh:User:XtexChooser]]";
  });
}
