import { Schema } from '../../types';
export interface FungibleTradeType {
    address: string;
    quantity: number;
}
export declare const ERC20Schema: Schema<FungibleTradeType>;
