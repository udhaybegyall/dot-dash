type Dot = {
    x: number;
    y: number;
}

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

    addEdge(dot1: Dot, dot2: Dot) {
        const key1 = this.getKey(dot1.x, dot1.y);
        const key2 = this.getKey(dot2.x, dot2.y);
        if (this.adjacencyList.has(key1) && this.adjacencyList.has(key2)) {
            this.adjacencyList.get(key1)?.add(key2);
            this.adjacencyList.get(key2)?.add(key1);
        }
    }

    areNeighbors(dot1: Dot, dot2: Dot): boolean {
        // const key1 = this.getKey(dot1.x, dot1.y);
        // const key2 = this.getKey(dot2.x, dot2.y);
        return (
          (Math.abs(dot1.x - dot2.x) === 1 && dot1.y === dot2.y) ||
          (Math.abs(dot1.y - dot2.y) === 1 && dot1.x === dot2.x)
        );
    }

    hasEdge(dot1: Dot, dot2: Dot): boolean {
        const key1 = this.getKey(dot1.x, dot1.y);
        const key2 = this.getKey(dot2.x, dot2.y);
        return this.adjacencyList.get(key1)?.has(key2) || false;
    }

    checkForSquares(): { x: number; y: number }[] {
        const squares = [];
    
        for (let x = 0; x < this.rows - 1; x++) {
          for (let y = 0; y < this.cols - 1; y++) {
            if (
              this.hasEdge({ x, y }, { x: x + 1, y }) &&
              this.hasEdge({ x, y }, { x, y: y + 1 }) &&
              this.hasEdge({ x: x + 1, y }, { x: x + 1, y: y + 1 }) &&
              this.hasEdge({ x, y: y + 1 }, { x: x + 1, y: y + 1 })
            ) {
              squares.push({ x, y });
            }
          }
        }
    
        return squares;
    }

}

export default Graph;