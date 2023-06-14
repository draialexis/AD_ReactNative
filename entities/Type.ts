// entities/Type.ts

import { TypeName } from "./TypeName";

export interface Type {
    name: TypeName;
    weakAgainst: string[];
    effectiveAgainst: string[];
}
