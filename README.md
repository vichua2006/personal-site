## Personal Website!!

My [personal website](https://victorhuang.vercel.app/) built with Next.js and Tailwind CSS. Enjoy!

![image](https://github.com/user-attachments/assets/c896fed5-6fbb-4d72-954c-6abc8bd77730)

design inspo: [Billy Tseng](https://www.billytseng.com/), [Wilbur Zhang](https://www.wilburzhang.com/), [Ching Lam Lau](https://www.chinglamlau.ca/), and [Ivan Yu](https://ivan-yu.ca/)

### Local development

Run `npm install`, then `npm run dev`. Use `npm run build` and `npm run lint` to check changes.

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
