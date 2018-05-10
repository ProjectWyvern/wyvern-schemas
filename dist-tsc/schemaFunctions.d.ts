import * as Web3 from 'web3';
import { AnnotatedFunctionABI, Schema } from './types';
export interface LimitedCallSpec {
    target: string;
    calldata: string;
}
export declare const encodeCall: (abi: Web3.MethodAbi, parameters: any[]) => string;
export interface CallSpec {
    target: string;
    calldata: string;
    replacementPattern: string;
}
export declare type SellEncoder<T> = (schema: Schema<T>, asset: T) => CallSpec;
export declare const encodeSell: SellEncoder<any>;
export declare type BuyEncoder<T> = (schema: Schema<T>, asset: T, address: string) => CallSpec;
export declare const encodeBuy: BuyEncoder<any>;
export declare type DefaultCallEncoder = (abi: AnnotatedFunctionABI) => string;
export declare const encodeDefaultCall: DefaultCallEncoder;
export declare type ReplacementEncoder = (abi: AnnotatedFunctionABI) => string;
export declare const encodeReplacementPattern: ReplacementEncoder;
