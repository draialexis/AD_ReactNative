// redux/reducers/moveReducer.ts
import { CREATE_MOVE, DELETE_MOVE, GET_MOVES, MOVE_ERROR, UPDATE_MOVE } from '../constants';
import { Move } from "../../entities/Move";

export type MoveState = {
    moves: Move[];
    error: string | null;
};

type MoveAction = {
    type: string;
    payload?: Move | Move[] | string;
};

const initialState: MoveState = {
    moves: [],
    error: null
}

export default function moveReducer(state = initialState, action: MoveAction): MoveState {
    switch (action.type) {
        case GET_MOVES:
            return {
                ...state, moves: action.payload as Move[] || [],
                error: null,
            };
        case CREATE_MOVE:
            return {
                ...state, moves: [...state.moves, action.payload as Move],
                error: null,
            };
        case UPDATE_MOVE:
            return {
                ...state,
                moves: state.moves.map(move => move.id === (action.payload as Move).id ? action.payload as Move : move),
                error: null,
            };
        case DELETE_MOVE:
            return {
                ...state,
                moves: state.moves.filter(move => move.id !== action.payload),
                error: null,
            };
        case MOVE_ERROR:
            return {
                ...state,
                error: action.payload as string
            };
        default:
            return state;
    }
}
