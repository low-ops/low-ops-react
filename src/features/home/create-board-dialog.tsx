import { Loader } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Button } from '../../components/ui/button';
import { useBoards } from '../../core/boards-context';

type CreateBoardDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateBoardDialog({ open, onOpenChange }: CreateBoardDialogProps) {
  const { createBoard } = useBoards();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  function reset() {
    setName('');
    setImage(null);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;

    setIsCreating(true);
    try {
      const imageUrl = image ? URL.createObjectURL(image) : '/boards/website-redesign.svg';
      createBoard(name, imageUrl);
    } finally {
      setIsCreating(false);
      reset();
      onOpenChange(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="m-auto w-[min(100%,28rem)] rounded-2xl border border-border/80 bg-white p-0 shadow-2xl backdrop:bg-black/40"
      onClose={() => {
        reset();
        onOpenChange(false);
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onOpenChange(false);
        }
      }}
    >
      <div className="p-6" onClick={(event) => event.stopPropagation()}>
        <header className="mb-5">
          <h2 className="font-display text-2xl font-semibold">Create new board</h2>
        </header>

        <form aria-label="Create board" className="mb-4 flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Board name
            </label>
            <input
              id="name"
              name="name"
              required
              type="text"
              placeholder="Board name"
              className="flex h-9 w-full rounded-xl border border-input bg-white px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              value={name}
              onChange={(event) => setName(event.target.value.replace(/\s+/g, ''))}
            />
          </div>

          <div className="mb-2 grid w-full items-center gap-1.5">
            <label htmlFor="image" className="text-sm font-medium">
              Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="flex h-9 w-full rounded-xl border border-input bg-white px-3 py-1 text-sm file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium"
              onChange={(event) => setImage(event.target.files?.[0] ?? null)}
            />
          </div>

          <Button size="lg" type="submit" className="relative flex flex-row rounded-xl" disabled={isCreating}>
            {isCreating ? 'Creating...' : 'Create'}
            {isCreating ? <Loader className="absolute right-4 h-4 w-4 animate-spin" /> : null}
          </Button>
        </form>
      </div>
    </dialog>
  );
}
