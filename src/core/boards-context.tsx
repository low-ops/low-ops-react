import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { seedBoards } from './mocks/seed';
import { Status, type TBoard, type TBoardSummary, type TTask } from './models/types';

function now() {
  return new Date().toISOString();
}

function createId() {
  return crypto.randomUUID();
}

function buildInitialBoards(): TBoard[] {
  return seedBoards.map((board) => {
    const createdAt = now();
    return {
      id: createId(),
      name: board.name,
      image: board.image,
      createdAt,
      updatedAt: createdAt,
      tasks: board.tasks.map((task) => {
        const timestamp = now();
        return {
          id: createId(),
          title: task.title,
          description: task.description,
          status: Status[task.status],
          createdAt: timestamp,
          updatedAt: timestamp,
        };
      }),
    };
  });
}

type BoardsContextValue = {
  boards: TBoard[];
  boardList: TBoardSummary[];
  getBoardByName: (name: string) => TBoard | undefined;
  getTasksByStatus: (boardName: string, status: Status) => TTask[];
  createBoard: (name: string, image: string) => TBoard;
  deleteBoard: (id: string) => void;
  addTask: (boardName: string, title: string) => TTask;
  setColumnTasks: (boardName: string, status: Status, tasks: TTask[]) => void;
};

const BoardsContext = createContext<BoardsContextValue | null>(null);

export function BoardsProvider({ children }: { children: ReactNode }) {
  const [boards, setBoards] = useState<TBoard[]>(buildInitialBoards);

  const boardList = useMemo<TBoardSummary[]>(
    () =>
      boards.map(({ id, name, image, createdAt, updatedAt }) => ({
        id,
        name,
        image,
        createdAt,
        updatedAt,
      })),
    [boards],
  );

  const getBoardByName = useCallback(
    (name: string) => boards.find((board) => board.name === name),
    [boards],
  );

  const getTasksByStatus = useCallback(
    (boardName: string, status: Status) => {
      const board = boards.find((item) => item.name === boardName);
      return board?.tasks.filter((task) => task.status === status) ?? [];
    },
    [boards],
  );

  const createBoard = useCallback((name: string, image: string) => {
    const timestamp = now();
    const board: TBoard = {
      id: createId(),
      name,
      image: image || '/boards/website-redesign.svg',
      createdAt: timestamp,
      updatedAt: timestamp,
      tasks: [],
    };
    setBoards((current) => [board, ...current]);
    return board;
  }, []);

  const deleteBoard = useCallback((id: string) => {
    setBoards((current) => current.filter((board) => board.id !== id));
  }, []);

  const addTask = useCallback((boardName: string, title: string) => {
    const timestamp = now();
    const task: TTask = {
      id: createId(),
      title: title.trim(),
      description: '',
      status: Status.TODO,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    setBoards((current) =>
      current.map((board) => {
        if (board.name !== boardName) return board;
        return {
          ...board,
          updatedAt: timestamp,
          tasks: [task, ...board.tasks],
        };
      }),
    );

    return task;
  }, []);

  const setColumnTasks = useCallback((boardName: string, status: Status, tasks: TTask[]) => {
    const timestamp = now();
    const columnIds = new Set(tasks.map((task) => task.id));

    setBoards((current) =>
      current.map((board) => {
        if (board.name !== boardName) return board;

        const otherTasks = board.tasks.filter((task) => !columnIds.has(task.id));
        const updatedColumn = tasks.map((task) => ({
          ...task,
          status,
          updatedAt: timestamp,
        }));

        return {
          ...board,
          updatedAt: timestamp,
          tasks: [...otherTasks, ...updatedColumn],
        };
      }),
    );
  }, []);

  const value = useMemo(
    () => ({
      boards,
      boardList,
      getBoardByName,
      getTasksByStatus,
      createBoard,
      deleteBoard,
      addTask,
      setColumnTasks,
    }),
    [
      boards,
      boardList,
      getBoardByName,
      getTasksByStatus,
      createBoard,
      deleteBoard,
      addTask,
      setColumnTasks,
    ],
  );

  return <BoardsContext.Provider value={value}>{children}</BoardsContext.Provider>;
}

export function useBoards() {
  const context = useContext(BoardsContext);
  if (!context) {
    throw new Error('useBoards must be used within BoardsProvider');
  }
  return context;
}
