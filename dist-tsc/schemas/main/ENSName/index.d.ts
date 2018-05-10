import { Schema } from '../../../types';
export interface ENSNameType {
    nodeHash: string;
    nameHash?: string;
    name?: string;
}
export declare const ENSNameSchema: Schema<ENSNameType>;
