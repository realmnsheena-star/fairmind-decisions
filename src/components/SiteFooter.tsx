export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-background/50 py-8">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6">
        <p>© {new Date().getFullYear()} FairMind AI 2.0 — Building transparent, unbiased decisions.</p>
      </div>
    </footer>
  );
}
