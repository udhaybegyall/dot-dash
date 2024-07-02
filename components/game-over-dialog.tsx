import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface GameOverDialogProps {
    isOpen: boolean;
    winner: string;
    winnerScore: number;
    onClose: () => void;
    onRestart: () => void;
}

const GameOverDialog = ({
    isOpen,
    winner,
    winnerScore,
    onClose,
    onRestart,
}: GameOverDialogProps) => {
    const router = useRouter();

    const handleNoClick = () => {
        onClose();
        router.push('/');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Game Over</DialogTitle>
                    <DialogDescription>
                        <span className='text-2xl font-bold text-red-500'>
                            {winner}
                        </span>{' '}
                        <span className='text-2xl font-bold'>
                            won🎉 with {winnerScore} score!
                        </span>
                        <p>Do you want to play again with the same settings?</p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='gap-2'>
                    <Button
                        variant='outline'
                        onClick={handleNoClick}
                        className='w-full'
                    >
                        No
                    </Button>
                    <Button onClick={onRestart} className='w-full'>
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default GameOverDialog;
