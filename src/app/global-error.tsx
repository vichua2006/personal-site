"use client";

import ErrorScreen from "src/components/ErrorScreen";
import "./globals.css";

export default function GlobalError({ retry }: { retry: () => void }) {
  return (
    <html lang="en">
      <body className="bg-gray-950">
        <title>Something went wrong | Victor Huang</title>
        <ErrorScreen
          title="Something went wrong"
          description="The site couldn't load. Try again, or head back home."
          onRetry={retry}
        />
      </body>
    </html>
  );
}
