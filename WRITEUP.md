 

# Writeup of Vines

## Challenge 1

URL: `https://veins.xtexgame.eu.org/1b732e62-b4b6-5f12-8e53-f66b7e617021/hello-world`

打开后是一张图片

![challenge1.jpg](https://s1.ax1x.com/2023/01/26/pSN41qU.jpg)

在图片的DICOM元数据中可以找到

`/___.. ___.. _... _... ..___ ..... ..___ ..... _...._ ___.. _... _... __... _...._ ..... .____ .._. _... _...._ ___.. ...._ ._ ____. _...._ ...._ _.. ...__ _._. __... _._. ___.. _.... _... .._. .____ ___..`

> EXIf 用太多了，不好用了，容易发现（x

![pSN4ti9.md.png](https://s1.ax1x.com/2023/01/26/pSN4ti9.md.png)

一眼 Morse Code，解密得到 `88BB2525-8BB7-51FB-84A9-4D3C7C86BF18`

结合前面的`/`，可以推断出第二关 URL

> 注：CyberChef 带着 `/` 直接 `From Morse Code` 会解不出第一个 `8`

## Challenge 2

URL: `https://veins.xtexgame.eu.org/88BB2525-8BB7-51FB-84A9-4D3C7C86BF18`

```bash
➜  ~ curl https://veins.xtexgame.eu.org/88BB2525-8BB7-51FB-84A9-4D3C7C86BF18
GOoD jOB！ AccEss ViA dN肆贰 PleASe!
```

查询可以得知，DN42 是一个去中心化实验网络，使用 Private IP 地址 172.20.0.0/14 和 fd00::/8

但是解析域名可以发现并没有任何 DN42 中的 IP 的记录，因此不可能直接从 DN42 访问。

所以这需要欺诈，通过添加 [Forwarded](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Forwarded) 请求头，让服务器认为这是来自 DN42 的请求

> 实际上 `X-Forwarded-For` 理论上也可以，但是实际上会被 Caddy 原地扬了

```bash
➜  ~ curl -H "Forwarded: for=172.20.206.65" https://veins.xtexgame.eu.org/88BB2525-8BB7-51FB-84A9-4D3C7C86BF18 -v
< HTTP/2 200 
< alt-svc: h3=":443"; ma=2592000
< content-type: text/plain; charset=utf-8
< date: Thu, 26 Jan 2023 14:22:02 GMT
< server: Caddy
< x-next-challenge: /041d293c-13ef-5110-ad49-d75bdd2989a282928c3e-7bdb-5a59-a920-ddc2aef0bbb9/wow
< content-length: 37
< 
* Connection #0 to host veins.xtexgame.eu.org left intact
thE LinK TO ChALLenGE3 HaVE beeN sENT
```

下一关的 URL 包含在了一个响应头中

## Challenge 3

URL: `https://veins.xtexgame.eu.org/041d293c-13ef-5110-ad49-d75bdd2989a282928c3e-7bdb-5a59-a920-ddc2aef0bbb9/wow`

```bash
➜  ~ curl https://veins.xtexgame.eu.org/041d293c-13ef-5110-ad49-d75bdd2989a282928c3e-7bdb-5a59-a920-ddc2aef0bbb9/wow
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

很近了，很近了（破真-----BEGIN PGP SIGNATURE-----

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
```

前面是一段废话，最后一行可以看出是一个（不完整的）DNS 记录

能承载自定义信息的记录类型并不多，可以找到一个 TXT 记录

`veins.xtexgame.eu.org.  300     IN      TXT     "r48t49rp876t_u609_6t55_r367_9s6qu302.is.the.next.challenge"`

但是 `r48t49rp876t_u609_6t55_r367_9s6qu302` 并不能直接访问，同时，这也不符合前面所有 URL 都是 UUID v5 的特征

首先，很明显 UUID 前面短后面长，先进行一次反转，得到 `203uq6s9_763r_55t6_906u_t678pr94t84r`

然后见过的人一眼就能看出来是古典加密（凯撒密码），一个一个试，发现只有旋转 11 位时可以得到一个（除了下划线外）有效的 UUID

`203fb6d9_763c_55e6_906f_e678ac94e84c`

下一关是 `https://veins.xtexgame.eu.org/203fb6d9_763c_55e6_906f_e678ac94e84c`（将 `_` 换为 `-` 也可以打开）

## Challenge 4

URL: `https://veins.xtexgame.eu.org/203fb6d9_763c_55e6_906f_e678ac94e84c`

```bash
➜  ~ curl https://veins.xtexgame.eu.org/203fb6d9_763c_55e6_906f_e678ac94e84c -L
[[wzh:User:XtexChooser]]
```

写过任何基于 [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki) 的 [wiki](https://zh.wikipedia.org/wiki/%E7%B6%AD%E5%9F%BA) 的人都能一眼看出，这是一个 Wikitext 语法的 Inter-wiki 链接，而在大部分（除 WP 外的）维基上，`w/wen/wzh` 等是 Wikipedia 的前缀

因此可以找到[我的用户页](https://zh.wikipedia.org/wiki/User:XtexChooser)，里面找不到有用的信息，因为有用的信息在编辑历史中。

在 2023年1月23日 (一) 17:10‎ 的一笔编辑的描述中（直至结束时，此修订为最新版本），写着 `026112df-fb46-5a23-af57-e79259c6fe50`

## Challenge 5

URL: `https://veins.xtexgame.eu.org/026112df-fb46-5a23-af57-e79259c6fe50`

这是最后一关，也是最难的一关

![pSNI0ED.md.png](https://s1.ax1x.com/2023/01/26/pSNI0ED.md.png)

这是一个能一眼让人高血压的页面，~~参考~~来自sojo.im

可以看到

>你�，�险家，�迎来到最后一关，也是最难的一关，��无任何有用信息�只是为了气死你，本关题目在这。
>结束的URL 被藏在了这个文件里，文件中有一个加密算法，但是被某个（特指）暝灯暝�，解密不了了.你得把它修好 

查看源代码可以看到原文

> ```
> 你好，探险家，欢迎来到最后一关，也是最难的一关，本页无任何有用信息，只是为了气死你，本关题目在<a style="font-size: 0.4em;" href="/026112df-fb46-5a23-af57-e79259c6fe50/challenge5.bin">这</a>。</h4>
> <h5>
>     结束的URL 被藏在了这个文件里，文件中有一个加密算法，但是被某个（特指）暝灯暝了，解密不了了.你得把它修好
> ```

本页确实没有任何有用信息，只有这个 bin

> 暝灯指的是某位年底还在冲业绩的池先生

这是一个 512 字节的 bin（一个扇区），打开之后可以在末尾看到熟悉的 55AA，肯定有人知道这是 MBR 引导扇区的标志（但是实际上我写反了

这是使用 nasm 汇编写的一个 x86 二进制，[源码在这](https://github.com/xtexGame/game-2023-1/blob/main/chall5/main.asm)

源码中其实是有 `OS_BUILD` 和 `ELF_BUILD` 两种模式的（但是题目只发布了 OS 模式，ELF 只用于本地测试

简单分析可以发现文件中有一个字符串：`e87f5e87-60aa-4176-ab06-a18463fc84d7`

```bash
➜  ~ curl https://veins.xtexgame.eu.org/e87f5e87-60aa-4176-ab06-a18463fc84d7   
这题目哪有那么简单，再送你个没用的信息：20bf58b07f1b72827de9460177149cb5fa50c7fc0cd22ec2ad2a8e4da1d6043e<END>
```

当然不可能这么简单啦，然后这串“没用的信息”也确实没用，只是基于 IP 地址（这里做了 Caddy 兼容）和时间生成的一个哈希（

这个字符串在文件中也完全没用，只是混淆用的

简单分析可以发现程序

1. 设置段寄存器（是个引导程序都会干的
2. 关闭中断、加载 GDTR、进入 PE（保护模式）（这个保护模式实际上是坏的，我也不知道为什么懒得改了

接着，对 `0xEF5475F1, 0x8EE2DC9D, 0x4D0D3D04, 0xA41C5EC6, 0xA635E64C, 0x1DBE3370, 0xAF5A8BEA, 0xFFF170D` 这串数据，两个 32 位整数为一组，分为四组，分别调用一个函数，

函数会循环 32 轮，其对应的 C 语言实现为

```c
void decrypt(uint32_t (*v)[2], const uint32_t k[4]) {
  uint32_t v0 = *v[0], v1 = *v[1], sum = 0xC6EF3720,
           i;                  /* set up; sum is (delta << 5) & 0xFFFFFFFF */
  uint32_t delta = 0x9E3779B9; /* a key schedule constant */
  uint32_t k0 = k[0], k1 = k[1], k2 = k[2], k3 = k[3]; /* cache key */
  for (i = 0; i < 32; i++) {                           /* basic cycle start */
    // printf("cycle %d, v0: %X, v1: %X\n", i, v0, v1);
    v1 -= ((v0 << 4) + 0xb12c0fee) ^ (v0 + sum) ^ ((v0 >> 5) + 0x8309e9ff);
    v0 -= ((v1 << 4) + 0x1dbb6bf5) ^ (v1 + sum) ^ ((v1 >> 5) + 0xb00d45c5);
    sum -= delta;
  } /* end cycle */
  *v[0] = v0;
  *v[1] = v1;
}
```

嗯，里面有一堆常量

不过 OS 模式下有许多故意的坏掉的地方，比如 v0 左移的位数为 3，和 `((v1 >> 5) + 0xb00d45c5)` 进行 XOR 时实际上是 OR

但是如果你有印象，或者善于使用搜索引擎查找，`0xC6EF3720`、`0x9E3779B9` 这两个常量，可以发现这是 TEA 加密算法使用的 sum 和 DELTA，实际上也确实是，这段 C 语言的实现是我直接从 Wheeler, David J.; Needham, Roger M. [TEA, a tiny encryption algorithm](http://citeseer.ist.psu.edu/viewdoc/summary?doi=10.1.1.45.281). Lecture Notes in Computer Science (Leuven, Belgium: Fast Software Encryption: Second International Workshop). 1994-12-16, **1008**: 363–366. 这篇论文复制的（~~感谢~~

![pSNoFr6.md.png](https://s1.ax1x.com/2023/01/26/pSNoFr6.md.png)

而汇编中我直接内联了四个 key，对应上源码可以发现 key = `[0x1dbb6bf5, 0xb00d45c5, 0xb12c0fee], 0x8309e9ff`

解密可以得到 `/9fc9a653163948ae863469533eaac252`

（如果要修好程序，你加油~~我也不知道行不行~~

> 为了干扰反编译器，OS 模式下还有一堆混淆，比如在输出解密的内容到屏幕前，有一段花代码，运行时向内存写入 0xeb 并接上编译时存在的 0x09，形成一个 `JMP short` 指令，跳过花代码，但是反汇编会爆炸（

## End

打开 `http://veins.xtexgame.eu.org/9fc9a653163948ae863469533eaac252` 即可提交表单并获得 Token（实际上是一个 JWT

还有个坏掉的 CAPTCHA 不过服务器不会校验

![pSNorZT.md.png](https://s1.ax1x.com/2023/01/26/pSNorZT.md.png)

## Analysis

1. 钱不够，没人参加
2. ~~我可真是透明人~~
3. 看了下日志，有几个人看了一眼第一关，没人做到第二关
4. 还有一堆爬虫和来扫 RSS、admin 之类的玩意的
5. 提前结束，奖品回收
