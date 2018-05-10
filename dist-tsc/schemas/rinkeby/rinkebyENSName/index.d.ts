import { Schema } from '../../../types';
export interface RinkebyENSNameType {
    nodeHash: string;
    nameHash?: string;
    name?: string;
}
export declare const rinkebyENSNameSchema: Schema<RinkebyENSNameType>;
