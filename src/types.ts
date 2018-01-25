import * as Web3 from 'web3';

export enum Network {
  Main = 'main',
  Rinkeby = 'rinkeby',
  Kovan = 'kovan',
}

export enum ABIType {
  Function = Web3.AbiType.Function,
  Event = Web3.AbiType.Event,
}

export interface Token {
  name: string;
  symbol: string;
  decimals: number;
  address: string;
}

export interface NetworkTokens {
  canonicalWrappedEther: Token;
  otherTokens: Token[];
}

export enum StateMutability {
  Pure = 'pure',
  View = 'view',
  Payable = 'payable',
  Nonpayable = 'nonpayable',
}

export enum FunctionInputKind {
  Replaceable = 'replaceable',
  Asset = 'asset',
}

export interface AnnotatedFunctionInput {
  name: string;
  type: string;
  kind: FunctionInputKind;
  value?: any;
}

export enum FunctionOutputKind {
  Owner = 'owner',
}

export interface AnnotatedFunctionOutput {
  name: string;
  type: string;
  kind: FunctionOutputKind;
}

export interface AnnotatedFunctionABI {
  type: Web3.AbiType.Function;
  name: string;
  target: string;
  inputs: AnnotatedFunctionInput[];
  outputs: AnnotatedFunctionOutput[];
  constant: boolean;
  stateMutability: StateMutability;
  payable: boolean;
}

export enum EventInputKind {
  Source = 'source',
  Destination = 'destination',
  Asset = 'asset',
}

export interface AnnotatedEventInput {
  name: string;
  type: string;
  indexed: boolean;
  kind: EventInputKind;
}

export interface AnnotatedEventABI<T> {
  type: Web3.AbiType.Event;
  name: string;
  target: string;
  anonymous: boolean;
  inputs: AnnotatedEventInput[];
  nftFromInputs: (inputs: any) => T;
}

export interface SchemaFunctions<T> {
  transfer: (nft: T) => AnnotatedFunctionABI;
  ownerOf: (nft: T) => AnnotatedFunctionABI;
}

export interface SchemaEvents<T> {
  transfer?: AnnotatedEventABI<T>;
}

export interface FormatInfo {
  thumbnail: string;
  title: string;
  description: string;
  url: string;
}

export interface SchemaField {
  name: string;
  type: string;
  description: string;
  readOnly?: boolean;
}

export interface Schema<T> {
  name: string;
  description: string;
  thumbnail: string;
  website: string;
  fields: SchemaField[];
  unifyFields?: (fields: any) => any;
  nftFromFields: (fields: any) => T;
  functions: SchemaFunctions<T>;
  events: SchemaEvents<T>;
  formatter: (obj: T) => FormatInfo;
}
