import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FairMind AI 2.0 — Unbiased Decision System" },
      {
        name: "description",
        content:
          "Demonstrating how removing sensitive attributes makes AI decisions fair, transparent, and explainable.",
      },
      { property: "og:title", content: "FairMind AI 2.0 — Unbiased Decision System" },
      { name: "twitter:title", content: "FairMind AI 2.0 — Unbiased Decision System" },
      { name: "description", content: "FairMind AI 2.0 demonstrates AI bias by comparing decisions with and without sensitive attributes." },
      { property: "og:description", content: "FairMind AI 2.0 demonstrates AI bias by comparing decisions with and without sensitive attributes." },
      { name: "twitter:description", content: "FairMind AI 2.0 demonstrates AI bias by comparing decisions with and without sensitive attributes." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ce4a2fa0-b191-4ff9-b1d3-7c3c26fbe0c2/id-preview-d4dfc814--173dbb35-79fd-4940-b27c-aa2aa44bcece.lovable.app-1777110930240.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ce4a2fa0-b191-4ff9-b1d3-7c3c26fbe0c2/id-preview-d4dfc814--173dbb35-79fd-4940-b27c-aa2aa44bcece.lovable.app-1777110930240.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
