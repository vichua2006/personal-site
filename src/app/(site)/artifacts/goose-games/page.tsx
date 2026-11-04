import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ArticleHeading from "src/components/ArticleHeading";
import ImageCarousel from "src/components/ImageCarousel";

const media = "/artifacts/goose-games";
const retrospective =
  "https://hackthenorth.medium.com/honk-how-goose-games-turned-hack-the-north-into-a-game-2bf222419f35";

export const metadata: Metadata = {
  title: "Goose Games: From Badge Scan to Points",
  description: "How I helped design and build the quest and points logs for Goose Games at Hack the North 2025.",
};

export default function GooseGamesPage() {
  return (
    <>
      <article className="markdown-container">
        <header>
          <ArticleHeading as="h1" id="goose-games" className="leading-tight">
            Goose Games: From Badge Scan to Points
          </ArticleHeading>
          <p>
            At Hack the North, a badge scan at a workshop did two things: checked you in, and gave you special points to spend on prizes.
            That second part was <i>Goose Games</i>:
            an quest-reward system built to give hackers a low-stakes reason to step away from their
            projects, try a workshop, or meet someone new.
          </p>
          <p>
            As Ivan put it in{" "}
            <a href={retrospective}>the Hack the North retrospective</a>:
          </p>
          <aside
            aria-label="Ivan’s overview of Goose Games"
            className="my-6 rounded-lg border border-gray-700 bg-gray-900 p-4 sm:p-5 [&>p:last-child]:mb-0"
          >
            <p>
              <q cite={retrospective} className="italic">
                At its core, Goose Games revolved around short, lightweight
                quests that rewarded hackers for engaging with the event in{" "}
                <em>three</em> different ways.
              </q>
            </p>
            <ol>
              <li><strong>Scanned quests:</strong> Earn points automatically when a badge scan records a check-in, workshop visit, or meal pickup.</li>
              <li><strong>Puzzle and trivia quests:</strong> Submit an answer or the keyphrase from a solved puzzle.</li>
              <li><strong>Organizer quests:</strong> Complete a challenge in person and have an organizer confirm it.</li>
            </ol>
            <p>
              Hackers could see what their points would buy in the online store
              and claim prizes at the Goose Games desk.
            </p>
          </aside>
          <p>
            How do we make one badge scan count toward a quest without letting
            a second scan award points again? I had a blast figuring out what
            the backend needed to remember.
          </p>
        </header>

        <figure className="my-8">
          <figcaption className="mt-2 text-sm text-gray-400">
            below: Hacker dashboard designed by <a href="https://weinna.ca/goosegames">Weinna Zheng</a>. Developed by the frontend team.
          </figcaption>
          <ImageCarousel
            label="Goose Games dashboard, dashboard demo, prize store, and organizer quests"
            photos={[
              {
                src: `${media}/dashboard.webp`,
                alt: "Goose Games hacker dashboard showing quest progress, point balances, and prizes.",
                width: 1146,
                height: 608,
              },
              {
                src: `${media}/hacker-nest.webp`,
                alt: "Animated prototype of the Goose Games hacker dashboard, showing quest progress and points.",
                width: 882,
                height: 628,
              },
              {
                src: `${media}/hacker-store.webp`,
                alt: "Hacker prize store design showing item availability and prices in points.",
                width: 882,
                height: 628,
              },
              {
                src: `${media}/organizer-quests.webp`,
                alt: "Organizer dashboard design for managing Goose Games quests.",
                width: 882,
                height: 628,
              },
            ]}
          />
        </figure>

        <ArticleHeading id="objectives" className="mt-10">
          Objectives
        </ArticleHeading>
        <p>We needed to support three things.</p>
        <ul>
          <li>Track exactly what a player completed so a repeat scan earns nothing.</li>
          <li>Trace every balance change to a quest reward, prize redemption, or manual adjustment so that every player can be audited under scrutiny</li>
          <li>Keep attendance independent while saving each quest award as a single operation.</li>
        </ul>

        <p>
          <strong>TL;DR.</strong> This is the schema we landed on.{" "}
          <code>goose_game_quest_log</code> tracks quest completions,{" "}
          <code>goose_game_transactions</code> tracks points, and check-in can
          succeed on its own. The sections below walk through each decision.
        </p>
        <figure className="my-6">
          <a href={`${media}/schema.svg`} target="_blank" rel="noreferrer" className="block">
            <Image
              src={`${media}/schema.svg`}
              alt="Database diagram linking events to their activities, attendees, quests, and store items. The quest log records the activity ID for scanned quests, and both logs link to the player."
              width={660}
              height={996}
              unoptimized
              className="h-auto w-full rounded-lg border border-gray-800"
            />
          </a>
          <figcaption className="mt-2 text-sm text-gray-400">
            <a href={`${media}/schema.svg`} target="_blank" rel="noreferrer">
              Open full-size diagram
            </a>
          </figcaption>
        </figure>

        <section className="mt-10">
          <ArticleHeading as="h3" id="quest-log">Prevent duplicate quest rewards</ArticleHeading>
          <p>
            A counter per player and quest could tell us someone attended two
            workshops. When the next scan came in, we still needed to know
            which two.
          </p>
          <p>
            <code>goose_game_quest_log</code> is a join table between{" "}
            <code>goose_game_players</code> and <code>goose_game_quests</code>,
            with one row per completion. For workshops, the database allows
            only one row for each combination of attendee, quest, and
            activity. For networking quests, it uses the person scanned in
            place of the activity.
          </p>
          <p>
            Counting rows takes more work than reading a counter, but the same
            rows tell us when each completion happened. Each player links to
            an <code>event_attendees</code> row, so returning hackers start
            with separate progress for each edition.
          </p>
        </section>

        <section className="mt-10">
          <ArticleHeading as="h3" id="transaction-log">Trace every points change</ArticleHeading>
          <p>
            A workshop reward might add five points, and a prize might cost
            ten without changing quest progress.{" "}
            <code>goose_game_transactions</code> records each credit or debit
            and its reason. A reward links to the quest, and a redemption links
            to an item in <code>goose_game_store_items</code>. The dashboard
            reads the current balance from <code>goose_game_players</code>.
          </p>
          <p>
            Saving the balance and ledger entry separately could leave them
            out of sync if one write failed. We save them in one database
            transaction and include the completion row when awarding a quest.
            For scanned quests, that PostgreSQL transaction runs at{" "}
            <code>READ COMMITTED</code>. The points increment and ledger insert
            share a savepoint inside the same transaction as the quest completion.
            If any write fails, all of them roll back.
          </p>
        </section>

        <section className="mt-10">
          <ArticleHeading as="h3" id="badge-scan">Keep check-in separate from quest rewards</ArticleHeading>
          <p>
            The scanner writes to <code>event_activity_scans</code> first so
            check-in works even when no reward is due.
          </p>
          <ol>
            <li>Use the workshop’s <code>event_activities</code> row to find a quest for the same event and activity category, then check the player’s completion limit.</li>
            <li>For an eligible scan, save the balance, ledger entry, and completion together in one transaction.</li>
            <li>If the database rejects a duplicate completion, roll back the award.</li>
          </ol>

          <figure className="my-6 rounded-lg border border-gray-800 bg-gray-900/60 px-4 py-3 text-sm">
            <figcaption className="font-medium text-white">
              An example player starts with 20 points
            </figcaption>
            <table className="mt-2 w-full text-left">
              <thead className="text-gray-400">
                <tr className="border-b border-gray-700">
                  <th scope="col" className="py-2 pr-2 font-medium">Action</th>
                  <th scope="col" className="py-2 pr-2 font-medium">What we record</th>
                  <th scope="col" className="py-2 text-right font-medium">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-2 pr-2">First workshop scan</td>
                  <td className="py-2 pr-2">
                    Workshop completion<br />+5 points in the ledger
                  </td>
                  <td className="py-2 text-right tabular-nums">25</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 pr-2">Same workshop again</td>
                  <td className="py-2 pr-2">Neither log changes</td>
                  <td className="py-2 text-right tabular-nums">25</td>
                </tr>
                <tr>
                  <td className="py-2 pr-2">Redeem a prize</td>
                  <td className="py-2 pr-2">−10 points in the ledger</td>
                  <td className="py-2 text-right tabular-nums">15</td>
                </tr>
              </tbody>
            </table>
          </figure>
        </section>

        <p>
          A hacker could spend their points and still see the workshop count
          toward their quest. If a balance looked off, we could check what
          they completed and follow each credit and debit in the ledger.
        </p>
        <hr />
        <p>
          Special thanks to <a href="https://www.linkedin.com/in/jacque1ine">Jackie Fung</a>{" "}
          for having my back throughout development. I learned a ton working together on schema design and programming practices,
          and for always having the most encouraging and positive attitude regardless of where and when we were at.
          Couldn’t have shipped Goose Games without you. 🫡
        </p>
      </article>

      <Link href="/artifacts" className="my-8 flex items-center text-gray-400 hover:text-gray-200">
        ← Back to all artifacts
      </Link>
    </>
  );
}
