import Router from "@koa/router";
import validator from "validator";
import { signToken } from "./token.js";

export default function makeEnd(router: Router) {
  router.get("/9fc9a653163948ae863469533eaac252", (ctx) => {
    ctx.redirect("/9fc9a653-1639-48ae-8634-69533eaac252");
  });
  router.get("/9fc9a653-1639-48ae-8634-69533eaac252", (ctx) => {
    ctx.redirect("/9fc9a653-1639-48ae-8634-69533eaac252/end.html");
  });
  router.post("/9fc9a653-1639-48ae-8634-69533eaac252/end", (ctx) => {
    const body = ctx.request.body;
    if (body == null) {
      ctx.redirect(
        "/9fc9a653-1639-48ae-8634-69533eaac252/end.html?err=invalid_form_data"
      );
      return;
    }
    const name = body["name"];
    const email = body["email"];
    if (name == null || email == null) {
      ctx.redirect(
        "/9fc9a653-1639-48ae-8634-69533eaac252/end.html?err=invalid_form_data"
      );
      return;
    }
    if (!validator.isEmail(email)) {
      ctx.redirect(
        "/9fc9a653-1639-48ae-8634-69533eaac252/end.html?err=invalid_email"
      );
      return;
    }
    if (!validator.isLength(name, { max: 32 })) {
      ctx.redirect(
        "/9fc9a653-1639-48ae-8634-69533eaac252/end.html?err=name_too_long"
      );
      return;
    }
    if (!validator.isLength(email, { max: 32 })) {
      ctx.redirect(
        "/9fc9a653-1639-48ae-8634-69533eaac252/end.html?err=email_too_long"
      );
      return;
    }
    // no CAPTCHA validation
    const token = signToken(ctx.request, name, email);
    ctx.redirect(
      "/9fc9a653-1639-48ae-8634-69533eaac252/end.html?token=" + token
    );
  });
}
