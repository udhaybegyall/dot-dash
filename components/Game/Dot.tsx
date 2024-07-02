'use client';

import { Dot as DotType } from '@/lib/types/grid';

interface DotProps extends DotType {
    dotSize: number;
    onClick: (x: number, y: number) => void;
    currentPlayer: string;
}

const Dot = ({
    x,
    y,
    dotSize,
    isSelected,
    onClick,
    currentPlayer,
}: DotProps) => {
    const dotStyle = {
        width: dotSize,
        height: dotSize,
        borderRadius: '50%',
        background: isSelected
            ? currentPlayer === 'player1'
                ? '#2DBDF9'
                : '#F28124'
            : '#9a9a9a',
        transition: 'all 0.2s ease-in-out',
        transformOrigin: 'center',
        cursor: 'pointer',
        zIndex: 1,
    };

    return (
        <div className='dot' style={dotStyle} onClick={() => onClick(x, y)} />
    );
};

export default Dot;
