import Router from "@koa/router";

export default function makeChallenge2(router: Router) {
  router.get(/^\/88BB2525-8BB7-51FB-84A9-4D3C7C86BF18$/i, (ctx) => {
    ctx.body = "GOoD jOB！ AccEss ViA dN肆贰 PleASe!";
    if (
      ctx.headers["forwarded"]?.includes("for=172.2") ||
      ctx.headers["forwarded"]?.includes('for="[fd') ||
      ctx.headers["x-forwarded-for"]?.toString().startsWith("172.2") ||
      ctx.headers["x-forwarded-for"]?.toString().startsWith("fd")
    ) {
      ctx.body = "thE LinK TO ChALLenGE3 HaVE beeN sENT";
      ctx.res.setHeader(
        "X-Next-Challenge",
        "/041d293c-13ef-5110-ad49-d75bdd2989a282928c3e-7bdb-5a59-a920-ddc2aef0bbb9/wow"
      );
    }
  });
}
