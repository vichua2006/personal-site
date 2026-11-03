import Link from "next/link";

export default function ArtifactsPage() {
  const contestSubtext = "2021 - 2024";

  return (
    <div className="text-white">
      <div className="font-bold mb-4">Artifacts</div>
      <p className="my-4">
        This is not a project showcase, but rather self-documentation. I've
        realized how important public visibility and proof of work are, and how
        much of my own work is undocumented. The best time to start is now.
      </p>

      <p className="my-8 italic">
        These are unpolished but concrete and honest demonstrations of what I've
        done. Enjoy.
      </p>

      <header>
        <div className="font-bold mt-16">Entries</div>
      </header>

      <hr className="border-gray-700 my-4" />

      <div className="mt-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-4 py-2">
            <div className="min-w-0 flex-1">
              <Link href="/artifacts/provincial-programming-contest-winner">
                <h3 className="text-md text-white font-medium hover:underline underline-offset-4">
                  Three-Time Winner of Provincial Programming Contest.
                </h3>
              </Link>
            </div>
            <div className="shrink-0 text-right text-sm text-gray-400 italic">
              {contestSubtext}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
