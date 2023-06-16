// redux/store.ts

import { configureStore } from '@reduxjs/toolkit'
import moveReducer, { MoveState } from './reducers/moveReducer';

export type AppDispatch = typeof store.dispatch;

export type RootState = {
    move: MoveState;
};

const store = configureStore({
    reducer: {
        move: moveReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
