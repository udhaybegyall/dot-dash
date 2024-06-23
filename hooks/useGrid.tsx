import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import {
    selectDot,
    addConnection,
    addSquare,
} from '@/lib/store/slices/gridSlice';
import { Connection, Square } from '@/lib/types/grid';
import { Coordinate } from '@/lib/types/common';

function useGrid() {
    const dispatch = useDispatch();
    const { selectedDot, connections, squares } = useSelector(
        (state: RootState) => state.grid
    );

    function selectDotAction(dot: Coordinate) {
        dispatch(selectDot(dot));
    }

    function addConnectionAction(connection: Connection) {
        dispatch(addConnection(connection));
    }

    function addSquareAction(square: Square) {
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
