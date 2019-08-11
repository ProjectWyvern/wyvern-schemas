import { Schema } from '../../../types';
export interface OwnableContractType {
    name?: string;
    description?: string;
    address: string;
}
export declare const OwnableContractSchema: Schema<OwnableContractType>;
