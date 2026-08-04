import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { AddTaskInput } from './add-task-input';

type AddTaskProps = {
  boardName: string;
};

export function AddTask({ boardName }: AddTaskProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);

  return (
    <div className="flex w-full flex-col gap-2 p-2">
      {isAddingTask ? (
        <AddTaskInput boardName={boardName} onClose={() => setIsAddingTask(false)} />
      ) : (
        <Button
          variant="ghost"
          type="button"
          className="w-full rounded-xl border border-dashed border-primary/25 bg-white/70"
          onClick={() => setIsAddingTask(true)}
        >
          <Plus />
          Add task
        </Button>
      )}
    </div>
  );
}
