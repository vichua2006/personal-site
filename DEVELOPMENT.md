# Development notes

### Writing

Posts live in `src/content/posts`. Each `.md` file needs `title`, `description`, `date` (`MM-DD-YYYY`), and a `slug` matching its filename in frontmatter. The writing index discovers posts automatically and orders them newest first.

Article headings have fragment links: hover a heading or focus its `#` link to
jump to that section and share its URL. Markdown headings receive IDs from their
text, with numeric suffixes for repeats. Fixed artifact pages use `ArticleHeading`
with explicit IDs so their links stay stable when titles change.

The light can reveal text inside a paragraph or an entire block:

```md
This is :spotlight[hidden inline text] in a sentence.

:::spotlight
This whole block is hidden until the light reaches it.
:::
```

On mobile, where the light is not shown, both forms stay readable.

### Artifacts

Artifacts are fixed pages under `src/app/(site)/artifacts`. Add source previews with
`<LinkPreview href="https://example.com/article" label="2024" />`; the label is
optional text. The server component extracts the source's title, description,
and image at build time using `link-preview-js`, with article-content fallbacks
for pages missing metadata. No manually written preview copy or API key is needed.
Previews refresh on a fresh build; unavailable sources keep a basic clickable link.
Optional `title`, `description`, and `imageSrc` props override individual metadata
fields; `imageSrc` accepts a public asset path or an external URL. Use `imageAlt`
for supplied images, `note` for extra context alongside the source preview, and
`showImage={false}` to hide the image on a particular card.

### Error screens

Valid pages share the layout in `src/app/(site)`. The root `not-found.tsx` and
`error.tsx` sit outside that layout, so missing pages and runtime errors replace
the sidebar, spotlight, and footer with a standalone screen. `global-error.tsx`
covers root-layout failures. Runtime errors offer retry and home actions; 404s
offer a home link.
