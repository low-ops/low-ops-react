import { LayoutGrid } from 'lucide-react';
import { Link } from 'react-router';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25 transition-transform duration-300 group-hover:scale-105">
            <LayoutGrid className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-xl font-semibold tracking-tight text-foreground">
              Boardflow
            </span>
            <span className="text-xs font-medium text-muted-foreground">Plan work beautifully</span>
          </span>
        </Link>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-primary">
            Kanban
          </span>
          <span className="rounded-full bg-coral-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
            Local-ready
          </span>
        </div>
      </div>
    </header>
  );
}
