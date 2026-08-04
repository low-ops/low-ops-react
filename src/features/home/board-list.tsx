import { Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { useBoards } from '../../core/boards-context';
import { BoardActionMenu } from './board-action-menu';
import { BoardCoverImage } from './board-cover-image';

export function BoardList() {
  const { boardList } = useBoards();

  if (boardList.length === 0) {
    return (
      <div className="surface-panel flex flex-col items-center gap-3 px-6 py-16 text-center">
        <div className="rounded-2xl bg-brand-soft p-4">
          <img src="/no-data.svg" alt="No boards" width={110} height={110} />
        </div>
        <h2 className="font-display text-2xl font-semibold text-foreground">No boards yet</h2>
        <p className="max-w-md text-muted-foreground">
          Create your first board to start organizing tasks with color and clarity.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {boardList.map((board, index) => (
        <Link
          key={board.id}
          to={`/boards/${board.name}`}
          className="board-card fade-up group block h-64 p-0"
          style={{ animationDelay: `${index * 0.04}s` }}
        >
          <div className="relative h-44 w-full overflow-hidden rounded-t-2xl">
            <BoardCoverImage src={board.image} alt={board.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-primary shadow-sm backdrop-blur">
              <Sparkles className="h-3 w-3" />
              Board
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 px-4 py-3">
            <h2 className="truncate font-display text-lg font-semibold tracking-tight text-foreground">
              {board.name}
            </h2>
            <BoardActionMenu boardId={board.id} />
          </div>
        </Link>
      ))}
    </div>
  );
}
