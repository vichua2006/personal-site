export default function ErrorScreen({
  code,
  title,
  description,
  onRetry,
}: {
  code?: string;
  title: string;
  description: string;
  onRetry?: () => void;
}) {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center text-white">
      <div className="max-w-md">
        {code ? <p className="mb-3 text-sm text-gray-400">{code}</p> : null}
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mt-3 leading-relaxed text-gray-400">{description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="rounded-md border border-violet-400 px-4 py-2 text-violet-400 hover:bg-violet-400/10"
            >
              Try again
            </button>
          ) : null}
          <a href="/" className="text-violet-400 italic underline underline-offset-4 hover:text-violet-300">
            Back home
          </a>
        </div>
      </div>
    </main>
  );
}
