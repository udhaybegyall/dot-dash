"use client";

interface DotProps {
    x: number;
    y: number;
    dotSize: number;
    isSelected: boolean;
    onClick: (x: number, y: number) => void;
}

const Dot = ({ x, y, dotSize, isSelected, onClick }: DotProps) => {

    const dotStyle = {
        width: dotSize,
        height: dotSize,
        borderRadius: "50%",
        background: isSelected ? "blue" : "#7F8F9F",
        transition: "all 0.2s ease-in-out",
        transformOrigin: "center",
        cursor: "pointer",
        zIndex: 1,
    };

    return (
        <div
            className="dot"
            style={dotStyle}
            onClick={() => onClick(x, y)}
        />
    );
};

export default Dot;