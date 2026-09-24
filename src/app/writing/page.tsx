import Link from "next/link";
import { getAllPosts } from "src/lib/posts";

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <div className="text-white">
      <div className="font-bold mb-4 ">Writing</div>
      <p className="my-4">
        A collection of interesting pieces of writing from my Obsidian Vault.
        Some are blog entries, some are technical docs, some are little stories, and some are poem-ish fragments of thought.
      </p>

      <p className="my-8 italic">
        Wish you some entertaining discoveries, enjoy.
      </p>

      <header>
        <div className="font-bold mt-16">Entries</div>
      </header>

      <hr className="border-gray-700 my-4" />

      <div className="mt-4">
        <div className="space-y-4">
          {posts.map(({ title, date, description, slug }) => (
            <div key={slug} className="flex justify-between items-center py-2">
              <div>
                <p className="text-sm text-gray-400">{date}</p>
                <Link href={`/writing/${slug}`}>
                  <h3 className="text-md text-white font-medium hover:underline underline-offset-4">{title}</h3>
                </Link>
              </div>

              <div className="flex space-x-2 italic">{description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
