import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Page not Found</h1>
      <p className="text-accent-foreground">
        Return to{" "}
        <Link to="/" className="text-sky-600 dark:text-sky-400">
          dashboard
        </Link>
      </p>
    </div>
  );
}
