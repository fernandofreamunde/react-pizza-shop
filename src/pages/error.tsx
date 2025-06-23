import { Link, useRouteError } from "react-router";

export function Error() {
  const error = useRouteError() as Error;

  // here we can send the error to a service that collects them so we can process them
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">
        Surprise!! Something unexpected happened...
      </h1>
      <p className="text-accent-foreground">
        An error occured in the application, call support and mention the error
        code below:
      </p>
      <pre>{Math.random().toString(36).substring(2, 9)}</pre>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground">
        Return to the{" "}
        <Link to="/" className="text-sky-600 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  );
}
