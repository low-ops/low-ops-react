import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';

type BoardHeaderProps = {
  boardName: string;
};

export function BoardHeader({ boardName }: BoardHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="border-b border-white/60 bg-white/65 backdrop-blur-xl">
      <div className="container mx-auto flex h-full w-full items-center gap-3 px-4 py-4">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="rounded-xl border border-border/70 bg-white/80"
          aria-label="Back to boards"
          onClick={() => navigate('/')}
        >
          <ArrowLeft />
        </Button>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Active board</p>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            {boardName}
          </h1>
        </div>
      </div>
    </header>
  );
}
