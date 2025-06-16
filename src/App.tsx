import { Button } from "./components/ui/button";
import "./index.css";

export function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="bg-amber-400 text-black">Hello pizza</h1>
      <Button>click me</Button>
    </div>
  );
}
