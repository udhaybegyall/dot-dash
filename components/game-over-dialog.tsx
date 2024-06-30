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
    onClose: () => void;
    onRestart: () => void;
}

const GameOverDialog = ({
    isOpen,
    winner,
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
                        <span className='font-bold text-red-500'>{winner}</span>{' '}
                        <span className='font-bold'>won!</span> Do you want to
                        play again with the same settings? settings?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant='outline' onClick={handleNoClick}>
                        No
                    </Button>
                    <Button onClick={onRestart}>Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default GameOverDialog;
