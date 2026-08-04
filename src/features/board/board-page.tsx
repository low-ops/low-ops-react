import { Link, useParams } from 'react-router';
import { useBoards } from '../../core/boards-context';
import { BoardHeader } from './board-header';
import { ColumnsContainer } from './columns-container';

export function BoardPage() {
  const { slug = '' } = useParams();
  const { getBoardByName } = useBoards();
  const board = slug ? getBoardByName(slug) : undefined;

  if (!board) {
    return (
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-semibold">Board not found</h1>
        <p className="text-muted-foreground">This board does not exist in the mock workspace.</p>
        <Link to="/" className="text-primary underline-offset-4 hover:underline">
          Back to boards
        </Link>
      </div>
    );
  }

  return (
    <>
      <BoardHeader boardName={slug} />
      <main className="min-h-[calc(100vh-8.5rem)]">
        <div className="container mx-auto w-full px-4 py-8">
          <ColumnsContainer boardName={slug} />
        </div>
      </main>
    </>
  );
}
