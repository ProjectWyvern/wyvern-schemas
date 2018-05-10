import { AnnotatedFunctionABI, Schema } from '../../../types';
export interface RinkebyCustomType {
    name: string;
    description: string;
    thumbnail: string;
    url: string;
    transfer: AnnotatedFunctionABI;
}
export declare const rinkebyCustomSchema: Schema<RinkebyCustomType>;
