// entities/Move.ts

import { Type } from "./Type";
import { MoveCategoryName } from "./MoveCategoryName";

export interface Move {
    id: string | null;
    name: string;
    category: MoveCategoryName;
    power: number;
    accuracy: number;
    type: Type;
    schemaVersion: number;
}
