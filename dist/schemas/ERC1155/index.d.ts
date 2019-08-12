import { Schema } from '../../types';
export interface SemiFungibleTradeType {
    id: string;
    address: string;
    quantity: string;
}
export declare const ERC1155Schema: Schema<SemiFungibleTradeType>;
