import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import type { TTask } from '../../core/models/types';
import { cn } from '../../lib/cn';

type TaskCardProps = {
  task: TTask;
};

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { task },
  });

  return (
    <article
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        'flex cursor-grab items-center gap-2 rounded-xl border border-white/80 bg-white p-3 text-left text-sm shadow-sm transition-[border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md active:cursor-grabbing',
        isDragging && 'z-10 opacity-90 shadow-lg',
      )}
      {...attributes}
      {...listeners}
    >
      <GripVertical className="h-4 w-4 shrink-0 text-primary/45" />
      <p className="flex-1 font-medium leading-snug text-foreground">{task.title}</p>
    </article>
  );
}
