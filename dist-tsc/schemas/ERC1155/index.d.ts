import { BigNumber } from '@0xproject/utils';
import { Schema } from '../../types';
export interface SemiFungibleTradeType {
    id: string;
    address: string;
    quantity: BigNumber;
}
export declare const ERC1155Schema: Schema<SemiFungibleTradeType>;
