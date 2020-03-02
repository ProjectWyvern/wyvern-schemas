import { WyvernAtomicizerContract } from 'wyvern-js/lib/abi_gen/wyvern_atomicizer';
import { AnnotatedFunctionABI, FunctionInputKind, Schema } from './types';
export declare const encodeReplacementPattern: any;
export interface LimitedCallSpec {
    target: string;
    calldata: string;
}
export declare const encodeCall: (abi: AnnotatedFunctionABI, parameters: any[]) => string;
export interface CallSpec {
    target: string;
    calldata: string;
    replacementPattern: string;
}
export declare type SellEncoder<T> = (schema: Schema<T>, asset: T, address: string) => CallSpec;
export declare const encodeSell: SellEncoder<any>;
export declare type AtomicizedSellEncoder<T> = (schema: Schema<T>, assets: T[], address: string, atomicizer: WyvernAtomicizerContract) => Partial<CallSpec>;
export declare const encodeAtomicizedSell: AtomicizedSellEncoder<any>;
export declare type AtomicizedBuyEncoder<T> = (schema: Schema<T>, assets: T[], address: string, atomicizer: WyvernAtomicizerContract) => Partial<CallSpec>;
export declare const encodeAtomicizedBuy: AtomicizedBuyEncoder<any>;
export declare type BuyEncoder<T> = (schema: Schema<T>, asset: T, address: string) => CallSpec;
export declare const encodeBuy: BuyEncoder<any>;
export declare type DefaultCallEncoder = (abi: AnnotatedFunctionABI, address: string) => string;
export declare const encodeDefaultCall: DefaultCallEncoder;
export declare type ReplacementEncoder = (abi: AnnotatedFunctionABI, kind?: FunctionInputKind) => string;
