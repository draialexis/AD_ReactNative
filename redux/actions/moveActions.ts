// redux/actions/moveAction.ts
import { CREATE_MOVE, DELETE, DELETE_MOVE, GET, GET_MOVES, MOVE_ERROR, POST, PUT, UPDATE_MOVE } from '../constants';
import { Move } from "../../entities/Move";
import { Dispatch } from "redux";
import { API_BASE_URL } from "../../config";


export const createMove = (move: Move) => {
    const verb = POST
    return async (dispatch: Dispatch) => {
        try {
            const response = await fetch(`${API_BASE_URL}/move`, {
                method: verb,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(move),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${verb}:  ${response.statusText}`);
            }

            const data = await response.json();
            dispatch({ type: CREATE_MOVE, payload: data });
        }
        catch (error) {
            console.error(error);
            // @ts-ignore
            dispatch({ type: MOVE_ERROR, payload: error.message });
        }
    }
}

export const getMoves = () => {
    const verb = GET
    return async (dispatch: Dispatch) => {
        try {
            const response = await fetch(`${API_BASE_URL}/move`);

            if (!response.ok) {
                throw new Error(`Failed to ${verb}:  ${response.statusText}`);
            }

            const data = await response.json();
            dispatch({ type: GET_MOVES, payload: data });
        }
        catch (error) {
            console.error(error);
            // @ts-ignore
            dispatch({ type: MOVE_ERROR, payload: error.message });
        }
    }
}

export const updateMove = (id: string, move: Move) => {
    const verb = PUT
    return async (dispatch: Dispatch) => {
        try {
            const response = await fetch(`${API_BASE_URL}/move/${id}`, {
                method: verb,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(move),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${verb}:  ${response.statusText}`);
            }

            const updatedMove = await response.json();
            dispatch({ type: UPDATE_MOVE, payload: updatedMove });
        }
        catch (error) {
            console.error(error);
            // @ts-ignore
            dispatch({ type: MOVE_ERROR, payload: error.message });
        }
    }
}

export const deleteMove = (id: string) => {
    const verb = DELETE
    return async (dispatch: Dispatch) => {
        try {
            const response = await fetch(`${API_BASE_URL}/move/${id}`, {
                method: verb,
            });

            if (!response.ok) {
                throw new Error(`Failed to ${verb}:  ${response.statusText}`);
            }

            dispatch({ type: DELETE_MOVE, payload: id });
        }
        catch (error) {
            console.error(error);
            // @ts-ignore
            dispatch({ type: MOVE_ERROR, payload: error.message });
        }
    }
}
