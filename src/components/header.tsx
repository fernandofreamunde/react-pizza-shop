import { Separator } from "@radix-ui/react-separator";
import { Home, Pizza, UtensilsCrossed } from "lucide-react";
import { Navlink } from "./navlink";
import { ThemeToggle } from "./theme/theme-toggle";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6 border" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Navlink to="/">
            <Home className="h-4 w-4" />
            Home
          </Navlink>

          <Navlink to="/orders">
            <UtensilsCrossed className="h-4 w-4" />
            Orders
          </Navlink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
