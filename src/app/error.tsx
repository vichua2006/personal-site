"use client";

import { useEffect } from "react";
import ErrorScreen from "src/components/ErrorScreen";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorScreen
      title="Something went wrong"
      description="This page couldn't load. Try again, or head back home."
      onRetry={retry}
    />
  );
}
