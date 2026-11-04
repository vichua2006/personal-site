import type { Metadata } from "next";
import Link from "next/link";
import ArticleHeading from "src/components/ArticleHeading";

const title = "ETHGlobal: From X Post to Stake Discount";

export const metadata: Metadata = {
  title,
  description:
    "How I built the flow that verifies an ETHGlobal referral post and applies a discount to an event checkout.",
  robots: { index: false, follow: false },
};

export default function EthGlobalXReferralsPage() {
  return (
    <>
      <article className="markdown-container">
        <ArticleHeading as="h1" id="ethglobal-x-referrals">
          {title}
        </ArticleHeading>
        <p>
          From ETHGlobal Tokyo onwards, accepted hackers could share a personal
          referral link on X and get half off their event stake once we verified the
          post. Accepted hackers who came through the link could get half off
          too. I worked on the flow from reading that post to changing the
          amount the hacker saw at checkout.
        </p>
        <p>
          On the surface it doesn’t appear that much has happened but a lot
          occurred in the background to get this through.
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
            The full Tokyo demo follows the referral link from sharing on X to
            verification and a stake that drops from 0.02 ETH to 0.01 ETH.
          </figcaption>
        </figure>

        <ArticleHeading id="verify-the-post">Verify the post</ArticleHeading>
        <p>
          The hacker needs an X account connected to ETHGlobal. They share their
          referral link from that account and paste the post URL back into the
          event page.
        </p>
        <p>
          We used Grok 4.3 through OpenRouter. Grok’s built-in X Search can look
          up profiles and fetch posts. I built and tested tools to resolve X
          profiles and retrieve a post’s text and author from its exact URL.
          For the referral, we checked that the author matched the connected
          account and that the post contained the hacker’s own referral link or
          code.
        </p>
        <ArticleHeading id="apply-the-reward">Apply the reward</ArticleHeading>
        <p>
          Once we verified the post, we still had to get the reward onto the
          right checkout. Applying it meant plugging the referral flow into
          four existing ETHGlobal data models. The payment fields are internal,
          so I’ll stick to what each table does and how they fit together.
        </p>

        <dl className="my-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4">
            <dt className="font-semibold text-white">
              <code>campaign</code>
            </dt>
            <dd className="mt-1 text-sm text-gray-300">
              Defines the offer for a specific event. In this case, the offer
              was half off the event stake.
            </dd>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4">
            <dt className="font-semibold text-white">
              <code>campaign_incentive</code>
            </dt>
            <dd className="mt-1 text-sm text-gray-300">
              Connects the campaign to a hacker and determines when they earn
              the reward. Here, verifying their referral post unlocked it.
            </dd>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-4">
            <dt className="font-semibold text-white">
              <code>discount</code>
            </dt>
            <dd className="mt-1 text-sm text-gray-300">
              Records the reduction and ties it to a specific payment.
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
          The tricky part was that the same link could lead to a discount in
          two ways. Verifying the post gave the person who shared it a one-time
          50% discount. An accepted hacker coming in through the link could
          also get 50% off. We blocked the campaign owner from claiming their
          own link through that second path. After verification, the page kept
          the referral active and disabled the verify button.
        </p>
        <p>
          We also had to handle hackers who already had a discount. If their
          stake was already discounted by 50% or more, we kept the existing
          discount. The referral campaign was scoped to the event’s active
          hacker stake price, so it only applied to that checkout.
        </p>
        <p>
          <strong>Here’s the end result.</strong> The hacker got their discount.
          The checkout showed 0.01 ETH instead of 0.02 ETH.
        </p>
      </article>

      <Link
        href="/artifacts"
        className="mt-8 inline-block text-sm text-gray-400 hover:text-gray-200"
      >
        ← Back to artifacts
      </Link>
    </>
  );
}
