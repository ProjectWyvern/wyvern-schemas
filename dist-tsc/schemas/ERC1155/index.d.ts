import { Schema } from '../../types';
export interface SemiFungibleTradeType {
    id: string;
    address: string;
    quantity: number;
}
export declare const ERC1155Schema: Schema<SemiFungibleTradeType>;
