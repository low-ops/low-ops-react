import { BoardList } from './board-list';
import { CreateBoard } from './create-board';

export function HomePage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <section className="surface-panel fade-up mb-8 flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Your workspace
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            My Boards
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">
            Organize projects, drag tasks across stages, and keep momentum without the gray spreadsheet
            feel.
          </p>
        </div>
        <div className="fade-up fade-up-delay-1">
          <CreateBoard />
        </div>
      </section>

      <section className="fade-up fade-up-delay-2">
        <BoardList />
      </section>
    </main>
  );
}
