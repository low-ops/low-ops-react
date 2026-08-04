import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { CreateBoardDialog } from './create-board-dialog';

export function CreateBoard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="lg" className="rounded-xl px-5" type="button" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        Create Board
      </Button>
      <CreateBoardDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
