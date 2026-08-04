import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';
import { useState } from 'react';
import { useBoards } from '../../core/boards-context';
import { Status, type TTask } from '../../core/models/types';
import { BoardColumn } from './board-column';

type ColumnsContainerProps = {
  boardName: string;
};

function statusFromListId(boardName: string, id: string): Status | null {
  const prefix = `${boardName}-`;
  if (!id.startsWith(prefix)) return null;
  const status = id.slice(prefix.length);
  if (status === Status.TODO || status === Status.IN_PROGRESS || status === Status.DONE) {
    return status;
  }
  return null;
}

function TaskDragPreview({ task }: { task: TTask }) {
  return (
    <article className="flex cursor-grabbing items-center gap-2 rounded-xl border border-white/80 bg-white p-3 text-left text-sm shadow-lg">
      <GripVertical className="h-4 w-4 shrink-0 text-primary/45" />
      <p className="flex-1 font-medium leading-snug text-foreground">{task.title}</p>
    </article>
  );
}

export function ColumnsContainer({ boardName }: ColumnsContainerProps) {
  const { getTasksByStatus, setColumnTasks } = useBoards();
  const [activeTask, setActiveTask] = useState<TTask | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  function findStatusByTaskId(taskId: string): Status | null {
    for (const status of [Status.TODO, Status.IN_PROGRESS, Status.DONE]) {
      if (getTasksByStatus(boardName, status).some((task) => task.id === taskId)) {
        return status;
      }
    }
    return null;
  }

  function handleDragStart(event: DragStartEvent) {
    const task = event.active.data.current?.task as TTask | undefined;
    setActiveTask(task ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const fromStatus = findStatusByTaskId(activeId);
    if (!fromStatus) return;

    const overStatus =
      statusFromListId(boardName, overId) ?? findStatusByTaskId(overId) ?? fromStatus;

    const fromTasks = [...getTasksByStatus(boardName, fromStatus)];
    const activeIndex = fromTasks.findIndex((task) => task.id === activeId);
    if (activeIndex < 0) return;

    const [movedTask] = fromTasks.splice(activeIndex, 1);

    if (fromStatus === overStatus) {
      const overIndex = fromTasks.findIndex((task) => task.id === overId);
      const insertIndex = overIndex >= 0 ? overIndex : fromTasks.length;
      fromTasks.splice(insertIndex, 0, movedTask);
      setColumnTasks(boardName, fromStatus, fromTasks);
      return;
    }

    const toTasks = [...getTasksByStatus(boardName, overStatus)];
    const overIndex = toTasks.findIndex((task) => task.id === overId);
    const insertIndex = overIndex >= 0 ? overIndex : toTasks.length;
    toTasks.splice(insertIndex, 0, movedTask);

    setColumnTasks(boardName, fromStatus, fromTasks);
    setColumnTasks(boardName, overStatus, toTasks);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveTask(null)}
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <BoardColumn title="To do" isTodo status={Status.TODO} boardName={boardName} />
        <BoardColumn title="In progress" status={Status.IN_PROGRESS} boardName={boardName} />
        <BoardColumn title="Done" status={Status.DONE} boardName={boardName} />
      </div>
      <DragOverlay>{activeTask ? <TaskDragPreview task={activeTask} /> : null}</DragOverlay>
    </DndContext>
  );
}
