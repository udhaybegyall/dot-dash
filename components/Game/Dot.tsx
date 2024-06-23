'use client';

import { Dot as DotType } from '@/lib/types/grid';

interface DotProps extends DotType {
    dotSize: number;
    onClick: (x: number, y: number) => void;
}

const Dot = ({ x, y, dotSize, isSelected, onClick }: DotProps) => {
    const dotStyle = {
        width: dotSize,
        height: dotSize,
        borderRadius: '50%',
        background: isSelected ? 'blue' : '#7F8F9F',
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
