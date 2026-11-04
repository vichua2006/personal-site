import type { Metadata } from "next";
import Link from "next/link";
import {
  enrichTweet,
  TweetBody,
  TweetContainer,
  TweetHeader,
  TweetInfoCreatedAt,
} from "react-tweet";
import { getTweet } from "react-tweet/api";
import ArticleHeading from "src/components/ArticleHeading";
import styles from "./tweet-previews.module.css";

const title = "ETHGlobal X/Twitter referral system";

const referralPosts = [
  {
    handle: "_DefaultAntxn",
    id: "2114774067492565315",
    name: "Anton Raj",
    excerpt: "I'm going to ETHGlobal Mumbai @ETHGlobal! With @MeghVyas3132",
  },
  {
    handle: "masafumiaida",
    id: "2095779307486654684",
    name: "Masafumi Aida",
    excerpt: "I'm going to ETHGlobal Tokyo 2026 @ETHGlobal!",
  },
  {
    handle: "0xpokotaro",
    id: "2101302152828477941",
    name: "増田健太郎",
    excerpt: "I'm going to ETHGlobal Tokyo 2026 @ETHGlobal!",
  },
  {
    handle: "RuntimeTerror0",
    id: "2116553890942656930",
    name: "Runtime Terror",
    excerpt: "I'm going to ETHGlobal Mumbai @ETHGlobal!",
  },
  {
    handle: "AdityaPati74270",
    id: "2112437398122762700",
    name: "Aditya Patil",
    excerpt: "I'm going to ETHGlobal Mumbai @ETHGlobal!",
  },
  {
    handle: "thisisouvik",
    id: "2107739159670714749",
    name: "Souvik Mandal",
    excerpt: "I'm going to ETHGlobal Mumbai @ETHGlobal!",
  },
];

export const metadata: Metadata = {
  title,
  description:
    "How I built the flow that verifies an ETHGlobal referral post and applies a discount to an event checkout.",
  robots: { index: false, follow: false },
};

async function ReferralPost({ id, handle, name, excerpt }: (typeof referralPosts)[number]) {
  const post = await getTweet(id, {
    cache: "force-cache",
    signal: AbortSignal.timeout(5000),
  }).catch(() => undefined);

  if (!post) {
    return (
      <a
        href={`https://x.com/${handle}/status/${id}`}
        className="block rounded-xl border border-gray-700 bg-gray-900 p-3 text-sm leading-snug hover:border-violet-400"
      >
        <span className="block font-medium text-white">{name}</span>
        <span className="block text-xs text-gray-400">@{handle} on X ↗</span>
        <span className="mt-2 block text-gray-300">{excerpt}</span>
      </a>
    );
  }

  const tweet = enrichTweet(post);
  return (
    <TweetContainer>
      <TweetHeader tweet={tweet} />
      <TweetBody tweet={tweet} />
      <div className={styles.date}>
        <TweetInfoCreatedAt tweet={tweet} />
      </div>
    </TweetContainer>
  );
}

export default function EthGlobalXReferralsPage() {
  return (
    <>
      <article className="markdown-container">
        <ArticleHeading as="h1" id="ethglobal-x-referrals">
          {title}
        </ArticleHeading>
        <p>
          From the ETHGlobal Tokyo hackathon onwards, accepted participants
          could share a personal referral link on X and get half off their
          stake once we verified the post. The stake is a deposit paid in
          Ethereum (ETH) to confirm a spot at the hackathon. Other accepted
          participants who used the link could get half off too. I worked on
          the flow from reading the post to generating the discount and applying it at checkout.
        </p>
        <p>
          I found this feature to be particularly interesting to work on, and wanted to write about it.
          not much seem to happen on the surface, but lots occurred in the background to get this through.
        </p>

        <figure className="my-8">
          <video
            aria-label="ETHGlobal Tokyo referral discount demo"
            className="aspect-[151/98] w-full rounded-lg border border-gray-800 bg-black"
            controls
            playsInline
            preload="metadata"
          >
            <source
              src="/artifacts/ethglobal-x-referrals/demo.mp4"
              type="video/mp4"
            />
            Your browser does not support embedded video.{" "}
            <a href="/artifacts/ethglobal-x-referrals/demo.mp4">Open the demo</a>.
          </video>
          <figcaption className="mt-2 text-sm text-gray-400">
            The full Tokyo demo <b>on prod</b> follows the referral link from sharing on X to
            verification and a stake that drops from 0.02 ETH to 0.01 ETH.
          </figcaption>
        </figure>

        <ArticleHeading id="verify-the-post">Verify the post</ArticleHeading>
        <p>
          Participants share their referral link on X and paste the post URL
          back into the event page. Verification starts with a Mastra agent
          tool call.
        </p>
        <p>
          We accessed Grok 4.3 through OpenRouter. Grok’s built-in X Search let
          us look up profiles and fetch posts without paying for direct access
          to the official Twitter API. I built and tested tools to resolve X
          profiles and retrieve a post’s text and author from its exact URL.
        </p>
        <ArticleHeading id="apply-the-reward">Apply the reward</ArticleHeading>
        <p>
          Once we verified the post, we still had to get the reward onto the
          right checkout. Applying it meant plugging the referral flow into
          five existing ETHGlobal data models. The payment fields are internal,
          so I’ll stick to what each table does and how they fit together.
        </p>

        <dl className="my-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4">
            <dt className="font-semibold text-white">
              <code>campaign</code>
            </dt>
            <dd className="mt-1 text-sm text-gray-300">
              Defines the reward for an event, including whether it’s a
              percentage or a flat amount and how much to take off. Our
              referral campaign offered 50% off.
            </dd>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4">
            <dt className="font-semibold text-white">
              <code>prices</code>
            </dt>
            <dd className="mt-1 text-sm text-gray-300">
              Lists what someone can pay for at an event. A ticket to Pragma,
              ETHGlobal’s one-day conference, has its own price. So does the
              deposit for a hackathon.
            </dd>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4 sm:col-span-2">
            <dt className="font-semibold text-white">
              <code>campaign_incentive</code>
            </dt>
            <dd className="mt-1 text-sm text-gray-300">
              Joins a campaign to a price and defines how the offer applies
              to that price. A price is eligible only if that pair has an
              incentive record. We linked the referral campaign to the hacker
              stake price.
            </dd>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4">
            <dt className="font-semibold text-white">
              <code>discount</code>
            </dt>
            <dd className="mt-1 text-sm text-gray-300">
              Once a participant qualifies, we generate a discount from the
              matching campaign incentive row and link it to that participant
              and their payment.
            </dd>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4">
            <dt className="font-semibold text-white">
              <code>payments</code>
            </dt>
            <dd className="mt-1 text-sm text-gray-300">
              Each payment represents a checkout. Once the discount is applied,
              the hacker sees the lower stake here.
            </dd>
          </div>
        </dl>

        <p>
          We added a marker to the tables’ flexible JSON <code>meta</code>{" "}
          field. We included that marker in the external metadata so eligible
          participants could apply the discount themselves.
        </p>
        <p id="edge-cases">
          This is where the edge cases got interesting.
          Here they are, and my solutions for each one:
        </p>
        <ul>
          <li>
            <strong>Missing or mismatched X account.</strong> We required a
            connected account and checked that it matched the post’s author.
          </li>
          <li>
            <strong>Referral link submitted on its own.</strong> We required
            an X post containing the participant’s own referral link or code.
          </li>
          <li>
            <strong>Failed verification.</strong> The participant could retry
            with a new post.
          </li>
          <li>
            <strong>Switching X accounts.</strong> We kept any discount already
            earned. To verify posts from the old account, the participant had
            to reconnect it.
          </li>
          <li>
            <strong>Repeat submissions.</strong> We recorded the X post ID in
            the discount’s metadata. Prisma supports JSON field lookup in
            PostgreSQL, so we directly use a <code>where</code> clause with a JSON{" "}
            <code>path</code> to look for the ID. A match blocked a second
            redemption. With no match, the post could still qualify.
          </li>
          <li>
            <strong>Self-referrals.</strong> The poster couldn’t use their own
            link to claim a second discount; similarly stored in the <code>campaign</code> that we generated for them. Other accepted participants could
            still use it.
          </li>
          <li>
            <strong>Existing discounts.</strong> If someone already had 50%
            off or more, we kept their existing discount.
          </li>
        </ul>
        <p>
          <strong>End result:</strong> The hacker gets their Ethereum
          discount. In the demo, the checkout drops from 0.02 ETH to 0.01 ETH.
          Pretty proud of this one since lots of people are using it, search{" "}
          <a href="https://x.com/search?q=I%27m%20going%20to%20ETHGlobal&amp;src=typed_query&amp;f=top">
            “I’m going to ETHGlobal” on X
          </a>
          , and see the posts.
        </p>
      </article>

      <div
        role="group"
        aria-label="ETHGlobal referral posts on X"
        className={styles.grid}
        data-theme="dark"
      >
        {referralPosts.map((post) => (
          <ReferralPost key={post.id} {...post} />
        ))}
      </div>

      <Link
        href="/artifacts"
        className="mt-8 inline-block text-sm text-gray-400 hover:text-gray-200"
      >
        ← Back to artifacts
      </Link>
    </>
  );
}
