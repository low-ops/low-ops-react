import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AppHeader } from './components/layout/app-header';
import { BoardsProvider } from './core/boards-context';
import { BoardPage } from './features/board/board-page';
import { HomePage } from './features/home/home-page';

export default function App() {
  return (
    <BrowserRouter>
      <BoardsProvider>
        <div className="app-shell">
          <AppHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/boards/:slug" element={<BoardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BoardsProvider>
    </BrowserRouter>
  );
}
