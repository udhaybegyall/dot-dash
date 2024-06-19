import React, { useState } from "react";
import Dot from "./Dot";
import Graph from "@/lib/graph";
import { getFirstLetter } from "@/lib/utils";

type GridProps = {
  rows: number;
  cols: number;
  dotSize: number;
  spacing: number;

  player1: string;
  player2: string;

  currentPlayer: number;
  onSquareCompletion: (player: number) => void;
  onTurnEnd: (squareCompleted: boolean) => void;
};

const Grid: React.FC<GridProps> = ({
  rows,
  cols,
  dotSize,
  spacing,
  player1,
  player2,
  currentPlayer,
  onSquareCompletion,
  onTurnEnd,
}) => {
  const [graph] = useState(new Graph(rows, cols));
  const [selectedDot, setSelectedDot] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [connections, setConnections] = useState<
    { dot1: { x: number; y: number }; dot2: { x: number; y: number } }[]
  >([]);

  const [squares, setSquares] = useState<
    { x: number; y: number; player: string }[]
  >([]);

  const handleDotClick = (x: number, y: number) => {
    const newDot = { x, y };
    if (selectedDot) {
      if (graph.areNeighbors(selectedDot, newDot)) {
        // If the new dot is a neighbor, connect them
        graph.addEdge(selectedDot, newDot);
        setConnections([...connections, { dot1: selectedDot, dot2: newDot }]);
        setSelectedDot(null);

        // Check for squares
        const newSquares = graph.checkForSquares();
        let squareCompleted = false;

        newSquares.forEach((square) => {
          if (!squares.some((s) => s.x === square.x && s.y === square.y)) {
            const player = currentPlayer === 1 ? getFirstLetter(player1) : getFirstLetter(player2);
            squares.push({ ...square, player });
            onSquareCompletion(currentPlayer);
            squareCompleted = true;
          }
        });

        setSquares([...squares]);
        onTurnEnd(squareCompleted);
      } else {
        // If the new dot is not a neighbor, update the selection
        setSelectedDot(newDot);
      }
    } else {
      // If no dot is currently selected, select the new dot
      setSelectedDot(newDot);
    }
  };

  const renderDots = () => {
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

  const renderConnections = () => {
    return connections.map(({ dot1, dot2 }, index) => (
      <line
        key={index}
        x1={dot1.y * (dotSize + spacing) + dotSize / 2}
        y1={dot1.x * (dotSize + spacing) + dotSize / 2}
        x2={dot2.y * (dotSize + spacing) + dotSize / 2}
        y2={dot2.x * (dotSize + spacing) + dotSize / 2}
        stroke="#7f8f9f6d"
        strokeWidth="3"
      />
    ));
  };

  const renderSquares = () => {
    return squares.map(({ x, y, player }, index) => (
      <text
        key={index}
        x={(y + 0.65) * (dotSize + spacing)}
        y={(x + 0.6) * (dotSize + spacing) + dotSize / 4}
        fontSize={dotSize * 1.5}
        fontWeight={600}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={player === getFirstLetter(player1) ? "#2DBDF9" : "#F28124"}
      >
        {player}
      </text>
    ));
  };
  

  const containerSize = (size: number, spacing: number, count: number) => {
    return size * count + spacing * (count - 1);
  };

  return (
    <div
      style={{
        position: "relative",
        width: `${containerSize(dotSize, spacing, cols)}px`,
        height: `${containerSize(dotSize, spacing, rows)}px`,
      }}
    >
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {renderConnections()}
        {renderSquares()}
      </svg>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${dotSize}px)`,
          gap: `${spacing}px`,
        }}
      >
        {renderDots()}
      </div>
    </div>
  );
};

export default Grid;
