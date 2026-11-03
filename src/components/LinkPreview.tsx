import { getLinkPreviewData } from "src/lib/link-preview";

export default async function LinkPreview({
  href,
  label,
  title,
  description,
  imageSrc,
  imageAlt = "",
  note,
  showImage = true,
}: {
  href: string;
  label?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  note?: string;
  showImage?: boolean;
}) {
  const preview = await getLinkPreviewData(href);
  const cardTitle = title ?? preview.title;
  const cardDescription = description ?? preview.description;
  const cardImage = imageSrc ?? preview.image;

  return (
    <a
      href={href}
      className="block overflow-hidden rounded-xl border border-gray-700 transition-colors hover:border-violet-400 hover:bg-gray-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
    >
      {showImage && cardImage ? (
        <img
          src={cardImage}
          alt={imageAlt}
          loading="lazy"
          className="max-h-72 w-full border-b border-gray-700 bg-gray-900 object-contain"
        />
      ) : null}
      <div className="p-4">
        <div className="flex items-start justify-between gap-4 text-sm text-gray-400">
          <span>{label ? `${label} · ` : ""}{preview.siteName}</span>
          <span aria-hidden="true">↗</span>
        </div>
        <h3 className="mt-2 font-medium text-white">{cardTitle}</h3>
        {cardDescription ? (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-300">{cardDescription}</p>
        ) : null}
        {note ? (
          <p className="mt-2 text-sm leading-relaxed text-gray-400">{note}</p>
        ) : null}
      </div>
    </a>
  );
}
