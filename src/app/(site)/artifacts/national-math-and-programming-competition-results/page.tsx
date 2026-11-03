import type { Metadata } from "next";
import Link from "next/link";
import ArticleHeading from "src/components/ArticleHeading";
import ImageCarousel from "src/components/ImageCarousel";

export const metadata: Metadata = {
  title: "National Math and Programming Competition Results",
  description:
    "My COMC provincial championship, Waterloo mathematics and programming distinctions, and Lloyd Auckland workshop experience, 2020–2024.",
};

const comcResults = [
  {
    year: "2023",
    result: "Grade 12 Bronze",
    detail: "New Brunswick; overall provincial Honourable Mention",
    href: "https://cms.math.ca/competitions/comc/comc2023/awards/",
  },
  {
    year: "2022",
    result: "Provincial champion",
    detail: "1st in New Brunswick overall; Grade 11 Gold; 55/80",
    href: "https://cms.math.ca/competitions/comc/comc2022/award-winners/",
  },
  {
    year: "2021",
    result: "Grade 10 Bronze",
    detail: "New Brunswick",
    href: "https://www2.cms.math.ca/Competitions/COMC/2021/results.html/NB",
  },
  {
    year: "2020",
    result: "Grade 9 Joint Gold",
    detail: "New Brunswick",
    href: "https://www2.cms.math.ca/Competitions/COMC/2020/results.html/NB",
  },
];

// CCC scores are recorded in reflections dated February 16 / March 18, 2022,
// February 17, 2023, and February 25, 2024. The official booklets' score/rank
// tables give each tied rank and the next lower score's rank. That next rank
// minus one counts everyone scoring at least as highly, including all ties.
const cccResults = [
  { year: "2024", score: 36, rank: 351, nextRank: 452, total: 3947, page: 22 },
  { year: "2023", score: 37, rank: 264, nextRank: 298, total: 3420, page: 21 },
  { year: "2022", score: 36, rank: 237, nextRank: 414, total: 3262, page: 14 },
];

// Math award years come from my September 2023 and June 2024 activity résumés.
// Public booklets provide contest context, not a named verification of these
// distinctions. No exact scores or ranks have been recovered. A distinction
// alone supports the published top-25% award category, not a top-10%/5% claim.
const waterlooResults = [
  { year: "2024", contest: "Euclid", booklet: "2024EuclidResults.pdf", rules: "euclid" },
  { year: "2023", contest: "Euclid", booklet: "2023EuclidResults.pdf", rules: "euclid" },
  { year: "2023", contest: "Fermat", booklet: "2023FermatResults.pdf", rules: "pcf" },
  { year: "2022", contest: "Euclid", booklet: "2022EuclidResults.pdf", rules: "euclid" },
  { year: "2022", contest: "Cayley", booklet: "2022CayleyResults.pdf", rules: "pcf" },
  { year: "2021", contest: "Pascal", booklet: "2021PascalResults.pdf", rules: "pcf" },
];

const sourceClass =
  "text-violet-500 underline underline-offset-4 hover:text-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400";

const tableFrameClass = "mt-4 w-full overflow-x-auto";
const tableClass =
  "w-full table-fixed border-collapse text-left text-sm [&_tr>:first-child]:pl-3 [&_tr>:last-child]:pr-3 sm:[&_tr>:first-child]:pl-4 sm:[&_tr>:last-child]:pr-4";

export default function NationalCompetitionResultsPage() {
  return (
    <article className="min-w-0 text-gray-300">
      <header className="markdown-container">
        <ArticleHeading id="national-math-and-programming-competition-results">National Math and Programming Competition Results</ArticleHeading>
        <p>
          A record of my years in competitive mathematics and programming:
          a provincial COMC championship, three years of CCC Senior results
          within the <strong className="font-semibold text-white italic">top 13%</strong>, six Waterloo mathematics distinctions, and the{" "}
          <a href="#auckland-heading">2023 Lloyd Auckland Invitational Mathematics Workshop</a>.
        </p>
      </header>

      <section className="mt-10" aria-labelledby="ccc-heading">
        <ArticleHeading id="ccc-heading" className="text-lg font-bold text-white">
          Canadian Computing Competition, Senior
        </ArticleHeading>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          Waterloo’s nationwide programming contest, also written internationally.
          {" "}
          Three consecutive years within the <strong className="font-semibold text-white italic">top 13%</strong> of Senior competitors,
          including the top 9% in 2023.
        </p>
        <div className={tableFrameClass}>
          <table className={tableClass}>
            <caption className="sr-only">CCC Senior scores and calculated standings, newest first</caption>
            <colgroup>
              <col className="w-16" />
              <col className="w-14 sm:w-20" />
              <col />
              <col className="w-26 sm:w-28" />
            </colgroup>
            <thead className="border-y border-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="py-3 pr-3 font-normal">Year</th>
                <th scope="col" className="py-3 pr-3 font-normal">Score</th>
                <th scope="col" className="py-3 pr-3 font-normal">Standing</th>
                <th scope="col" className="py-3 text-right font-normal">Source</th>
              </tr>
            </thead>
            <tbody>
              {cccResults.map(({ year, score, rank, nextRank, total, page }) => (
                <tr key={year} className="border-b border-gray-800 align-top">
                  <th scope="row" className="py-4 pr-3 font-normal tabular-nums text-gray-400">
                    {year}
                  </th>
                  <td className="py-4 pr-3 tabular-nums text-white">{score}/75</td>
                  <td className="py-4 pr-3">
                    <div className="font-medium tabular-nums text-white">
                      Top {(((nextRank - 1) / total) * 100).toFixed(1)}%
                    </div>
                    <div className="mt-1 text-xs leading-relaxed text-gray-400">
                      Joint {rank} of {total.toLocaleString("en-CA")}
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <a
                      className={`${sourceClass} inline-block text-xs leading-relaxed`}
                      href={`https://cemc.uwaterloo.ca/sites/default/files/documents/${year}/${year}CCCResults.pdf#page=${page}`}
                      aria-label={`${year} CCC Senior official score distribution`}
                    >
                      {year} results ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="comc-heading">
        <ArticleHeading id="comc-heading" className="text-lg font-bold text-white">
          Canadian Open Mathematics Challenge
        </ArticleHeading>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          A national mathematics contest run by the Canadian Mathematical Society.
          Four consecutive years of New Brunswick provincial awards, published
          under my name, Qibin Huang.
        </p>
        <div className={tableFrameClass}>
          <table className={tableClass}>
            <caption className="sr-only">COMC awards in New Brunswick, newest first</caption>
            <colgroup>
              <col className="w-16" />
              <col />
              <col className="w-26 sm:w-28" />
            </colgroup>
            <thead className="border-y border-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="py-3 pr-4 font-normal">Year</th>
                <th scope="col" className="py-3 pr-3 font-normal">Result</th>
                <th scope="col" className="py-3 text-right font-normal">Source</th>
              </tr>
            </thead>
            <tbody>
              {comcResults.map(({ year, result, detail, href }) => (
                <tr key={year} className="border-b border-gray-800 align-top">
                  <th scope="row" className="py-4 pr-4 font-normal tabular-nums text-gray-400">
                    {year}
                  </th>
                  <td className="py-4 pr-3">
                    <div className="font-medium text-white">{result}</div>
                    <div className="mt-1 leading-relaxed text-gray-400">{detail}</div>
                  </td>
                  <td className="py-4 text-right">
                    <a className={`${sourceClass} inline-block text-xs leading-relaxed`} href={href} aria-label={`${year} COMC official awards`}>
                      {year} results ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="waterloo-heading">
        <ArticleHeading id="waterloo-heading" className="text-lg font-bold text-white">
          Waterloo mathematics contests
        </ArticleHeading>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          Pascal, Cayley, Fermat and Euclid are Waterloo contests with nationwide
          and international participation.{" "}
          Six Certificates of Distinction across four contests. I participated
          in Euclid for four years, earning distinctions in 2022, 2023 and 2024.
        </p>
        <div className={tableFrameClass}>
          <table className={tableClass}>
            <caption className="sr-only">Waterloo contest distinctions, newest first</caption>
            <colgroup>
              <col className="w-16" />
              <col />
              <col className="w-22 sm:w-28" />
              <col className="w-26 sm:w-28" />
            </colgroup>
            <thead className="border-y border-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="py-3 pr-3 font-normal">Year</th>
                <th scope="col" className="py-3 pr-3 font-normal">Contest</th>
                <th scope="col" className="py-3 pr-3 font-normal">Standing</th>
                <th scope="col" className="py-3 text-right font-normal">Source</th>
              </tr>
            </thead>
            <tbody>
              {waterlooResults.map(({ year, contest, booklet }) => (
                <tr key={`${year}-${contest}`} className="border-b border-gray-800 align-top">
                  <th scope="row" className="py-4 pr-3 font-normal tabular-nums text-gray-400">
                    {year}
                  </th>
                  <td className="py-4 pr-3">
                    <div className="font-medium text-white">{contest}</div>
                  </td>
                  <td className="py-4 pr-3">
                    <div className="font-medium text-white">Top 25%</div>
                    <div className="mt-1 text-xs text-gray-400">Distinction</div>
                  </td>
                  <td className="py-4 text-right">
                    <a
                      className={`${sourceClass} inline-block text-xs leading-relaxed`}
                      href={`https://cemc.uwaterloo.ca/sites/default/files/documents/${year}/${booklet}`}
                      aria-label={`${year} ${contest} official results booklet`}
                    >
                      {year} results ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 border-b border-gray-800 pb-6" aria-labelledby="auckland-heading">
        <div className="flex items-start justify-between gap-4">
          <ArticleHeading id="auckland-heading" className="text-lg font-bold text-white">
            Lloyd Auckland Invitational Mathematics Workshop
          </ArticleHeading>
          <span className="pt-1 text-sm tabular-nums text-gray-400">2023</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed">
          Selected for a national cohort of approximately 70 students at the
          University of Waterloo, June 4–10. My performance on the Fermat Contest
          earned an invitation to apply, followed by acceptance and a week of
          mathematical problem solving with students from across Canada.
        </p>
        <a
          className={`${sourceClass} mt-3 inline-block text-xs`}
          href="https://cemc.uwaterloo.ca/workshops/student-workshops/auckland"
        >
          About the workshop ↗
        </a>
        <ImageCarousel
          label="Photos from the 2023 Lloyd Auckland Mathematics Workshop"
          photos={[
            {
              src: "/artifacts/auckland-2023/certificates.webp",
              alt: "Workshop participants holding their certificates on stage.",
              width: 2298,
              height: 1724,
            },
            {
              src: "/artifacts/auckland-2023/dunkley-sessions.webp",
              alt: "The Dunkley Sessions, Part 4: a mathematics problem sheet from June 2023.",
              width: 1724,
              height: 1724,
            },
            {
              src: "/artifacts/auckland-2023/lecture-hall.webp",
              alt: "Workshop participants posing together in a Waterloo lecture hall.",
              width: 2298,
              height: 1724,
            },
            {
              src: "/artifacts/auckland-2023/waterloo-sign.webp",
              alt: "Workshop participants beside the University of Waterloo sign at night.",
              width: 2298,
              height: 1724,
            },
          ]}
        />
      </section>

      <p className="mt-6 text-xs leading-relaxed text-gray-400">
        CCC percentages use the published annual score distributions: entrants
        at or above my score ÷ all Senior entrants × 100, including ties.
        Joint ranks follow Waterloo’s tables. Distinction means top 25%.
      </p>

      <Link href="/artifacts" className="my-8 inline-flex text-gray-400 hover:text-gray-200">
        ← Back to all artifacts
      </Link>
    </article>
  );
}
