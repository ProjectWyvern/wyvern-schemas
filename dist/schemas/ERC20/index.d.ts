import { Schema } from '../../types';
export interface FungibleTradeType {
    address: string;
    quantity: string;
}
export declare const ERC20Schema: Schema<FungibleTradeType>;
