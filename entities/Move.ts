import {Type} from "./Type";

export interface Move {
    name: string;
    category: string;
    power: number;
    accuracy: number;
    type: Type;
}
