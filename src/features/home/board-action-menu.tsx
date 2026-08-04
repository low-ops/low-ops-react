import { EllipsisVertical, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/ui/button';
import { useBoards } from '../../core/boards-context';

type BoardActionMenuProps = {
  boardId: string;
};

export function BoardActionMenu({ boardId }: BoardActionMenuProps) {
  const { deleteBoard } = useBoards();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="-mr-2 rounded-full bg-white/80 hover:bg-white"
        type="button"
        aria-label="Board actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen((value) => !value);
        }}
      >
        <EllipsisVertical />
      </Button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 bottom-full z-50 mb-1 min-w-32 rounded-xl border border-border/80 bg-white/95 p-1 shadow-lg backdrop-blur"
        >
          <button
            type="button"
            role="menuitem"
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setOpen(false);
              deleteBoard(boardId);
            }}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
            <span>Delete</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
