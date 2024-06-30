import React, { useEffect, useRef } from 'react';

import Dot from '@/components/Game/Dot';
import Graph from '@/lib/graph';
import { getFirstLetter } from '@/lib/utils';
import { Coordinate } from '@/lib/types/common';
import { Connection, Square } from '@/lib/types/grid';

type Player = 'player1' | 'player2';

type GridProps = {
    rows: number;
    cols: number;
    dotSize: number;
    spacing: number;

    player1: string;
    player2: string;

    selectedDot: Coordinate | null;
    connections: Connection[];
    squares: Square[];
    currentPlayer: Player;
    onDotSelect: (dot: Coordinate | null) => void;
    onConnectionAdd: (connection: Connection) => void;
    onSquareAdd: (square: Square) => void;
    onSquareCompletion: (player: Player) => void;
    onTurnEnd: (squareCompleted: boolean) => void;
};

const renderDots = (
    handleDotClick: (x: number, y: number) => void,
    rows: number,
    cols: number,
    dotSize: number,
    selectedDot: { x: number; y: number } | null
) => {
    const dots = [];
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            dots.push(
                <Dot
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    isSelected={selectedDot?.x === x && selectedDot?.y === y}
                    onClick={handleDotClick}
                    dotSize={dotSize}
                />
            );
        }
    }
    return dots;
};

const renderConnections = (
    connections: {
        dot1: { x: number; y: number };
        dot2: { x: number; y: number };
    }[],
    dotSize: number,
    spacing: number
) => {
    return connections.map(({ dot1, dot2 }, index) => (
        <line
            key={index}
            x1={dot1.y * (dotSize + spacing) + dotSize / 2}
            y1={dot1.x * (dotSize + spacing) + dotSize / 2}
            x2={dot2.y * (dotSize + spacing) + dotSize / 2}
            y2={dot2.x * (dotSize + spacing) + dotSize / 2}
            stroke='#7f8f9f6d'
            strokeWidth='3'
        />
    ));
};

const renderSquares = (
    squares: { x: number; y: number; player: string }[],
    dotSize: number,
    spacing: number,
    player1: string
) => {
    return squares.map(({ x, y, player }, index) => (
        <text
            key={index}
            x={(y + 0.65) * (dotSize + spacing)}
            y={(x + 0.6) * (dotSize + spacing) + dotSize / 4}
            fontSize={dotSize * 1.5}
            fontWeight={600}
            textAnchor='middle'
            alignmentBaseline='middle'
            fill={player === getFirstLetter(player1) ? '#2DBDF9' : '#F28124'}
        >
            {player}
        </text>
    ));
};

const Grid: React.FC<GridProps> = ({
    rows,
    cols,
    dotSize,
    spacing,
    player1,
    player2,
    selectedDot,
    connections,
    squares,
    currentPlayer,
    onDotSelect,
    onConnectionAdd,
    onSquareAdd,
    onSquareCompletion,
    onTurnEnd,
}) => {
    // const graph = useRef(new Graph(rows, cols));
    const graphRef = useRef<Graph | null>(null);

    useEffect(() => {
        graphRef.current = new Graph(rows, cols);

        connections.forEach(connection => {
            graphRef.current?.addEdge(connection.dot1, connection.dot2);
        });
        // console.log('graph', graph);
    }, [rows, cols, connections]);

    const handleDotClick = (x: number, y: number) => {
        const newDot = { x, y };
        if (selectedDot) {
            if (graphRef.current?.areNeighbors(selectedDot, newDot)) {
                // Check if an edge already exists between the selected dot and the new dot
                if (!graphRef.current.hasEdge(selectedDot, newDot)) {
                    // If the new dot is a neighbor and there is no edge between them, connect them
                    graphRef.current.addEdge(selectedDot, newDot);
                    onConnectionAdd({ dot1: selectedDot, dot2: newDot });

                    console.log('New edge added', selectedDot, newDot);

                    // Check for squares
                    const newSquares = graphRef.current.checkForSquares(newDot);
                    let squareCompleted = false;

                    newSquares.forEach(square => {
                        if (
                            !squares.some(
                                s => s.x === square.x && s.y === square.y
                            )
                        ) {
                            const player =
                                currentPlayer === 'player1'
                                    ? getFirstLetter(player1)
                                    : getFirstLetter(player2);
                            onSquareAdd({ ...square, player });
                            onSquareCompletion(currentPlayer);
                            squareCompleted = true;
                        }
                    });

                    // Reset the selected dot
                    // onDotSelect(null);
                    onTurnEnd(squareCompleted);
                }
            } else {
                // If the new dot is not a neighbor, update the selection
                onDotSelect(newDot);
            }
        } else {
            // If no dot is currently selected, select the new dot
            onDotSelect(newDot);
        }
    };

    const containerSize = (size: number, spacing: number, count: number) => {
        return size * count + spacing * (count - 1);
    };

    return (
        <div className='box-sizing:border-box rounded-lg border border-[#242424] bg-card p-10'>
            <div
                style={{
                    position: 'relative',
                    width: `${containerSize(dotSize, spacing, cols)}px`,
                    height: `${containerSize(dotSize, spacing, rows)}px`,
                }}
            >
                <svg
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {renderConnections(connections, dotSize, spacing)}
                    {renderSquares(squares, dotSize, spacing, player1)}
                </svg>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`,
                        gridTemplateRows: `repeat(${rows}, ${dotSize}px)`,
                        gap: `${spacing}px`,
                    }}
                >
                    {renderDots(
                        handleDotClick,
                        rows,
                        cols,
                        dotSize,
                        selectedDot
                    )}
                </div>
            </div>
        </div>
    );
};

export default Grid;
