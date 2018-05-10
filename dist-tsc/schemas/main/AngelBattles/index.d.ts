import { Schema } from '../../../types';
export declare enum Kind {
    Angel = "Angel",
    Pet = "Pet",
    Accessory = "Accessory",
}
export interface AngelBattlesType {
    kind: Kind;
    id: string;
}
export declare const AngelBattlesSchema: Schema<AngelBattlesType>;
