import ErrorScreen from "src/components/ErrorScreen";

export default function NotFound() {
  return (
    <ErrorScreen
      code="404"
      title="Page not found"
      description="This page doesn't exist, or it may have moved."
    />
  );
}
