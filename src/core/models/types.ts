export enum Status {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  TODO = 'TODO',
}

export type TTask = {
  id: string;
  title: string;
  description: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
};

export type TBoard = {
  id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  tasks: TTask[];
};

export type TBoardSummary = Omit<TBoard, 'tasks'>;

export type TCreateBoardData = {
  name: string;
  image: File | null;
};
