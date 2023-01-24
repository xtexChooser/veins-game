import Router from "@koa/router";

// Answer: 203fb6d9-763c-55e6-906f-e678ac94e84c ROT13(11) r48t49rp876t-u609-6t55-r367-9s6qu302

export default function makeChallenge3(router: Router) {
  router.get(
    "/041d293c-13ef-5110-ad49-d75bdd2989a282928c3e-7bdb-5a59-a920-ddc2aef0bbb9/wow",
    (ctx) => {
      ctx.body = `
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

很近了，很近了（破真
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEQ9VexyhYBNHp/qr7l48udg2dsOsFAmPORo0ACgkQl48udg2d
sOtr+xAAnPvYknxOEUC3mQPtXPD3uieV7M7mQQE6xTl5ofK/zjLdPzjV8UhzBKAh
dI8hMw1wRqqLI733p+n1ExkorZLU1L6p/mIheIMW6asuWViC0vbQhD7IwBBx8lZ+
MptMEEy9J9kaL5Cvn4581nYa/jdPkgC83KsbqBGmhzxJrLXgCz2lqFKgdR7i1dUP
yeThePqxD7QfMwNXQQWyeMne24F5x7EGz5IYLjjUmDwg6tL05yjmFm1O2cOcl1dd
XIqN3OZZwRGZvHD42+Yg2p+yduvF0oIKXdgB4qFg/MxzhsoxcUmGaLSUsMFy4Pq1
ENHKHkj9/8Bsco+6E3S/h7v8XXRNaVlDn1L8Ua8dCtAA+lot99mvA5mR8E5+p65t
VPKGp5vuZFdHhwe8PcNZTtRGp18mCEa77eQsuE10ZPNWUFg2c6xKYXauMjmsqrVi
5n5oCQCCWZKvtfUYwD2Dyht8e8aRRZk3lvNV+1/cUqg3LUEFDEfA80zUVQHocGZM
As9tyrXPU3w9XArbLUThtLAK0EBP/296vmjacyCNSQ6Uk1HeIj8iNnOeBmTkGjMd
FkPOOTPC+w/uAjXg0SzSA9lA87l2gp71TnBnyogzvW7rFv9VhWzyGV3uI1PQR35y
V9Tk9fbK/b+BrPRLGyu3FyFl6B5YOrnjDCWkpwcf1tt6uei2vLE=
=h/mU
-----END PGP SIGNATURE-----

veins.xtexgame.eu.org. 300    IN
    `.trim();
    }
  );
}
