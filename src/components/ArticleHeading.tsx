import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"h2"> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export default function ArticleHeading({
  as: Tag = "h2",
  id,
  className = "",
  children,
  ...props
}: Props) {
  return (
    <Tag {...props} id={id} className={`article-heading ${className}`}>
      {children}
      {id ? (
        <a
          className="heading-anchor"
          href={`#${encodeURIComponent(id)}`}
          aria-label={`Link to ${id.replace(/-/g, " ")}`}
          title="Link to this section"
        >
          #
        </a>
      ) : null}
    </Tag>
  );
}
