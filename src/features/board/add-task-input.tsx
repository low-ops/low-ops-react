import { Loader } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Button } from '../../components/ui/button';
import { useBoards } from '../../core/boards-context';

type AddTaskInputProps = {
  boardName: string;
  onClose: () => void;
};

export function AddTaskInput({ boardName, onClose }: AddTaskInputProps) {
  const { addTask } = useBoards();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    queueMicrotask(() => inputRef.current?.focus());
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!value.trim()) return;

    setIsPending(true);
    try {
      addTask(boardName, value);
    } finally {
      setIsPending(false);
      onClose();
    }
  }

  return (
    <form className="flex flex-col gap-2 py-2" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        name="name"
        required
        type="text"
        id="task-title"
        placeholder="Enter task title"
        className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        disabled={isPending}
      />
      <div className="flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          disabled={isPending}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button className="relative flex-1" type="submit" disabled={isPending}>
          {isPending ? 'Adding...' : 'Add'}
          {isPending ? <Loader className="absolute right-4 ml-2 h-4 w-4 animate-spin" /> : null}
        </Button>
      </div>
    </form>
  );
}
