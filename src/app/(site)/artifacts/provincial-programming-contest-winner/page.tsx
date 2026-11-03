import type { Metadata } from "next";
import Link from "next/link";
import LinkPreview from "src/components/LinkPreview";
import ArticleHeading from "src/components/ArticleHeading";

export const metadata: Metadata = {
  title: "Three-Time Winner of Provincial Programming Contest.",
  description: "Coverage of my provincial programming contest wins in 2021, 2022, and 2024.",
};

export default function ProvincialProgrammingContestPage() {
  return (
    <>
      <div className="markdown-container">
        <ArticleHeading id="provincial-programming-contest-winner">Three-Time Consecutive Winner of Provincial Programming Contest.</ArticleHeading>
        <p>Coverage of my provincial programming contest wins in 2021, 2022, and 2024.</p>
        <p>
          Teamed up with <a href="https://simianwang.me">Simian Wang</a> (2022)
          {" and "}<a href="https://rohankatreddy.com">Rohan Katreddy</a> (2024).
          {"  "}For my last year, me and Rohan went with the handle "Imagine Losing", and solved all 8 problems in half time :)
        </p>
      </div>
      <div className="mt-8 space-y-4">
        <LinkPreview
          href="https://www.facebook.com/JDICareers/posts/pfbid02VGnAVf7XKGAcwUAiF8aouFUAEsP7jrJnHu4sdCarC1N4TkqbgChsGBCcigitoqYjl"
          label="2024"
        />
        <div className="rounded-xl border border-gray-700 p-4">
          <div className="text-sm text-gray-400">2023</div>
          <ArticleHeading as="h3" id="no-contest-in-2023" className="mt-2 font-medium text-white">No contest held</ArticleHeading>
          <p className="mt-2 text-sm leading-relaxed text-gray-300">
            There was no provincial programming contest in 2023.
          </p>
        </div>
        <LinkPreview
          href="https://nbhspc22.kattis.com/contests/nbhspc22/standings"
          label="2022"
          imageSrc="/artifacts/nb-programming-contest-2022.png"
          imageAlt="Fredericton1's first-place result and team details in the 2022 competition."
          note="There was no article that year."
        />
        <LinkPreview
          href="https://blogs.unb.ca/newsroom/2021/06/unbs-2021-high-school-programming-competition-won-by-fredericton-high-student.php"
          label="2021"
          showImage={false}
        />
      </div>
      <Link href="/artifacts" className="text-gray-400 hover:text-gray-200 flex items-center my-8">
        ← Back to all artifacts
      </Link>
    </>
  );
}
