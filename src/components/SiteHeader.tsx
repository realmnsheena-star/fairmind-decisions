import { Link } from "@tanstack/react-router";
import { Brain } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/try", label: "Try It" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground shadow-md"
            style={{ background: "var(--gradient-hero)" }}
          >
            <Brain className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold">FairMind AI</div>
            <div className="text-[10px] text-muted-foreground">Unbiased Decision System</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-[status=active]:bg-accent data-[status=active]:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/try"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
        >
          Try Demo
        </Link>
      </div>
    </header>
  );
}
