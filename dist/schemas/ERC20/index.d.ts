import { BigNumber } from '@0xproject/utils';
import { Schema } from '../../types';
export interface FungibleTradeType {
    address: string;
    quantity: BigNumber;
}
export declare const ERC20Schema: Schema<FungibleTradeType>;
