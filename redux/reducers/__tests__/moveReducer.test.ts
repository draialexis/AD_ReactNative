// redux/reducers/__tests__/moveReducer.test.ts
import moveReducer from '../moveReducer';
import { CREATE_MOVE, DELETE_MOVE, GET_MOVES, MOVE_ERROR, UPDATE_MOVE } from '../../constants';
import { Move } from "../../../entities/Move";
import { MoveCategoryName } from "../../../entities/MoveCategoryName";
import { TypeName } from "../../../entities/TypeName";

describe('moveReducer', () => {
    const initialState = {
        moves: [],
        error: null
    };

    it('returns the initial state when an action type is not passed', () => {
        // @ts-ignore
        const reducer = moveReducer(undefined, { type: null });

        expect(reducer).toEqual(initialState);
    });

    it('handles GET_MOVES action', () => {
        const moves: Move[] = [{
            id: '1',
            name: 'Test Move',
            category: MoveCategoryName.PHYSICAL,
            power: 100,
            accuracy: 100,
            type: { name: TypeName.NORMAL, weakAgainst: [], effectiveAgainst: [] },
            schemaVersion: 2
        }];
        const reducer = moveReducer(
            initialState,
            { type: GET_MOVES, payload: moves }
        );

        expect(reducer).toEqual({ ...initialState, moves });
    });

    it('handles CREATE_MOVE action', () => {
        const move: Move = {
            id: '1',
            name: 'Test Move',
            category: MoveCategoryName.PHYSICAL,
            power: 100,
            accuracy: 100,
            type: { name: TypeName.NORMAL, weakAgainst: [], effectiveAgainst: [] },
            schemaVersion: 2
        };
        const reducer = moveReducer(
            initialState,
            { type: CREATE_MOVE, payload: move }
        );

        expect(reducer).toEqual({ ...initialState, moves: [move] });
    });

    it('handles UPDATE_MOVE action', () => {
        const initialMove: Move = {
            id: '1',
            name: 'Test Move',
            category: MoveCategoryName.PHYSICAL,
            power: 100,
            accuracy: 100,
            type: { name: TypeName.NORMAL, weakAgainst: [], effectiveAgainst: [] },
            schemaVersion: 2
        };
        const updatedMove: Move = { ...initialMove, name: 'Updated Move' };
        const reducer = moveReducer(
            { ...initialState, moves: [initialMove] },
            { type: UPDATE_MOVE, payload: updatedMove }
        );

        expect(reducer).toEqual({ ...initialState, moves: [updatedMove] });
    });

    it('handles DELETE_MOVE action', () => {
        const move: Move = {
            id: '1',
            name: 'Test Move',
            category: MoveCategoryName.PHYSICAL,
            power: 100,
            accuracy: 100,
            type: { name: TypeName.NORMAL, weakAgainst: [], effectiveAgainst: [] },
            schemaVersion: 2
        };
        const reducer = moveReducer(
            { ...initialState, moves: [move] },
            // @ts-ignore
            { type: DELETE_MOVE, payload: move.id }
        );

        expect(reducer).toEqual(initialState);
    });

    it('handles MOVE_ERROR action', () => {
        const reducer = moveReducer(initialState, { type: MOVE_ERROR, payload: 'Error message' });

        expect(reducer).toEqual({ ...initialState, error: 'Error message' });
    });
});
