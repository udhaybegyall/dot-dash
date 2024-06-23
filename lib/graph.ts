import { Coordinate } from './types/common';

class Graph {
    private rows: number;
    private cols: number;
    private adjacencyList: Map<string, Set<string>>;

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.adjacencyList = new Map();
        this.initializeDots();
    }

    private initializeDots() {
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {
                const key = this.getKey(x, y);
                this.adjacencyList.set(key, new Set());
            }
        }
    }

    private getKey(x: number, y: number): string {
        return `${x}-${y}`;
    }

    addEdge(dot1: Coordinate, dot2: Coordinate) {
        const key1 = this.getKey(dot1.x, dot1.y);
        const key2 = this.getKey(dot2.x, dot2.y);
        if (this.adjacencyList.has(key1) && this.adjacencyList.has(key2)) {
            this.adjacencyList.get(key1)?.add(key2);
            this.adjacencyList.get(key2)?.add(key1);
        }
    }

    areNeighbors(dot1: Coordinate, dot2: Coordinate): boolean {
        return (
            (Math.abs(dot1.x - dot2.x) === 1 && dot1.y === dot2.y) ||
            (Math.abs(dot1.y - dot2.y) === 1 && dot1.x === dot2.x)
        );
    }

    hasEdge(dot1: Coordinate, dot2: Coordinate): boolean {
        const key1 = this.getKey(dot1.x, dot1.y);
        const key2 = this.getKey(dot2.x, dot2.y);
        return this.adjacencyList.get(key1)?.has(key2) || false;
    }

    checkForSquares(dot: Coordinate): { x: number; y: number }[] {
        // const squares: { x: number; y: number; }[] = [];
        const { x, y } = dot;

        const potentialSquares = [
            { x, y },
            { x: x - 1, y },
            { x, y: y - 1 },
            { x: x - 1, y: y - 1 },
        ];

        return potentialSquares.filter(
            ({ x, y }) =>
                x >= 0 &&
                y >= 0 &&
                this.hasEdge({ x, y }, { x: x + 1, y }) &&
                this.hasEdge({ x, y }, { x, y: y + 1 }) &&
                this.hasEdge({ x: x + 1, y }, { x: x + 1, y: y + 1 }) &&
                this.hasEdge({ x, y: y + 1 }, { x: x + 1, y: y + 1 })
        );
    }
}

export default Graph;
