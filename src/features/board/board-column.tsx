import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CheckCircle2, CircleDot, ListTodo } from 'lucide-react';
import { useBoards } from '../../core/boards-context';
import { Status } from '../../core/models/types';
import { cn } from '../../lib/cn';
import { AddTask } from './add-task';
import { TaskCard } from './task-card';

const columnStyles = {
  [Status.TODO]: {
    accent: 'text-todo',
    soft: 'bg-[oklch(0.95_0.03_230)]',
    badge: 'bg-todo/15 text-todo',
    icon: 'todo' as const,
  },
  [Status.IN_PROGRESS]: {
    accent: 'text-progress',
    soft: 'bg-[oklch(0.96_0.04_75)]',
    badge: 'bg-progress/15 text-[oklch(0.45_0.1_65)]',
    icon: 'progress' as const,
  },
  [Status.DONE]: {
    accent: 'text-done',
    soft: 'bg-[oklch(0.95_0.035_160)]',
    badge: 'bg-done/15 text-done',
    icon: 'done' as const,
  },
};

type BoardColumnProps = {
  title: string;
  status: Status;
  boardName: string;
  isTodo?: boolean;
};

export function BoardColumn({ title, status, boardName, isTodo = false }: BoardColumnProps) {
  const { getTasksByStatus } = useBoards();
  const tasks = getTasksByStatus(boardName, status);
  const style = columnStyles[status];
  const dropListId = `${boardName}-${status}`;
  const { setNodeRef, isOver } = useDroppable({ id: dropListId });

  return (
    <section
      className={cn(
        'flex min-h-[28rem] flex-col overflow-visible rounded-2xl border border-white/80 bg-white/80 shadow-[0_12px_36px_-28px_rgba(15,70,100,0.45)] backdrop-blur-md transition-[box-shadow,ring,transform] duration-200',
        isOver && 'ring-2 ring-primary/30',
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-4">
        <div className="flex items-center gap-2">
          <span className={cn('rounded-lg bg-brand-soft p-2', style.accent)}>
            {style.icon === 'todo' ? <ListTodo className="h-4 w-4" /> : null}
            {style.icon === 'progress' ? <CircleDot className="h-4 w-4" /> : null}
            {style.icon === 'done' ? <CheckCircle2 className="h-4 w-4" /> : null}
          </span>
          <h2 className="font-display text-base font-semibold tracking-tight">{title}</h2>
        </div>
        <span className={cn('rounded-full px-2.5 py-1 text-xs font-bold', style.badge)}>
          {tasks.length}
        </span>
      </header>

      <div className={cn('flex-1 p-3 transition-colors duration-300', style.soft)}>
        {tasks.length === 0 ? (
          <div className="mb-2 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-primary/20 bg-white/50 px-3 py-8 text-center">
            <img src="/no-data.svg" alt="No tasks" width={72} height={72} className="opacity-80" />
            <p className="text-sm font-medium text-muted-foreground">No tasks yet</p>
          </div>
        ) : null}

        <div ref={setNodeRef} className="flex min-h-24 flex-col gap-2.5">
          <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </div>
      </div>

      {isTodo ? (
        <div className="border-t border-border/70 bg-white/70 p-2">
          <AddTask boardName={boardName} />
        </div>
      ) : null}
    </section>
  );
}
