## Personal Website!!

My [personal website](https://www.victor-huang.ca/) built with Next.js and Tailwind CSS. Enjoy!

![image](https://github.com/user-attachments/assets/c896fed5-6fbb-4d72-954c-6abc8bd77730)

design inspo: [Billy Tseng](https://www.billytseng.com/), [Wilbur Zhang](https://www.wilburzhang.com/), [Ching Lam Lau](https://www.chinglamlau.ca/), and [Ivan Yu](https://ivan-yu.ca/)

### Local development

Run `npm install`, then `npm run dev`. Use `npm run build` and `npm run lint` to check changes.

### Cloudflare hosting

The Cloudflare deployment serves a Next.js static export on Workers. Pages and
Markdown posts are generated at build time; publishing a new post requires a deploy.
The ordinary Next.js build remains available for Vercel and `npm run start`.

```sh
npm ci
npx cf auth login
npm run deploy
```

`npm run build:cloudflare` builds with Webpack and packages `out/` into Cloudflare's
Build Output Specification. `npx cf deploy --prebuilt --dry-run` validates the upload;
`npx cf deploy --prebuilt` deploys an already-built version. Use `npm run deploy` for
a fresh build and deploy. The small packaging script bypasses `cf init`'s automatic
OpenNext migration, which adds a server adapter this static site does not need.
The CLI and build-output packages are pinned together because these APIs are in beta.

For automatic deployments, push these files, then connect this repository in the
Worker's **Settings → Builds** using production branch `main`, build command
`npm run build:cloudflare`, and deploy command `npx cf deploy --prebuilt`.
Leave preview builds disabled until a separate preview command is configured.
See [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/).

The production Worker is `personal-site`, with custom domains `victor-huang.ca` and
`www.victor-huang.ca` declared in `cloudflare.config.ts`. DNS is managed by Cloudflare;
the domain remains registered at Namecheap. A Cloudflare Redirect Rule sends the root
domain to HTTPS `www`, preserving paths and query strings. The fallback URL is
`https://personal-site.vichua2006.workers.dev`. The old
`victorhuang.vercel.app` address belongs to Vercel and cannot move to Cloudflare:
keep it online or configure a Vercel redirect after verifying the custom domain.
The Waterloo CS webring still identifies this site as `victorhuang.vercel.app`.
Update its registration and `src/components/Footer.tsx` together when moving that
registration to `www.victor-huang.ca`.

### Writing

Posts live in `src/content/posts`. Each `.md` file needs `title`, `description`, `date` (`MM-DD-YYYY`), and a `slug` matching its filename in frontmatter. The writing index discovers posts automatically and orders them newest first.

The light can reveal text inside a paragraph or an entire block:

```md
This is :spotlight[hidden inline text] in a sentence.

:::spotlight
This whole block is hidden until the light reaches it.
:::
```

On mobile, where the light is not shown, both forms stay readable.
