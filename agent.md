# Agent notes

Keep `README.md` limited to the personal introduction and Local Development.
Keep hosting details here and feature documentation in `DEVELOPMENT.md`.

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

Cloudflare Builds is connected to `vichua2006/personal-site`. Pushes to `main`
automatically deploy using build command `npm run build:cloudflare` and deploy
command `npx cf deploy --prebuilt`, with the repository root as the working directory.
Preview builds are disabled until a separate preview command is configured.
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
