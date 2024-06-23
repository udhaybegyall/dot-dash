import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import {
    selectDot,
    addConnection,
    addSquare,
} from '@/lib/store/slices/gridSlice';

interface Dot {
    x: number;
    y: number;
}

function useGrid() {
    const dispatch = useDispatch();
    const { selectedDot, connections, squares } = useSelector(
        (state: RootState) => state.grid
    );

    function selectDotAction(dot: Dot) {
        dispatch(selectDot(dot));
    }

    function addConnectionAction(connection: {
        dot1: { x: number; y: number };
        dot2: { x: number; y: number };
    }) {
        dispatch(addConnection(connection));
    }

    function addSquareAction(square: { x: number; y: number; player: string }) {
        dispatch(addSquare(square));
    }

    return {
        selectedDot,
        connections,
        squares,
        selectDot: selectDotAction,
        addConnection: addConnectionAction,
        addSquare: addSquareAction,
    };
}

export default useGrid;
