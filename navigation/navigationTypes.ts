// navigation/navigationTypes.ts

import { Move } from "../entities/Move";

export type RootStackParamList = {
    MoveList: undefined;
    MoveDetail: { move: Move };
    MoveForm: { move?: Move };
};

export type RootTabParamList = {
    Home: undefined;
    Moves: undefined;
};
