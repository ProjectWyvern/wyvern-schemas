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
  Owner = 'owner',
  Index = 'index',
  Count = 'count',
}

export interface AnnotatedFunctionInput {
  name: string;
  type: string;
  kind: FunctionInputKind;
  value?: any;
}

export enum FunctionOutputKind {
  Owner = 'owner',
  Asset = 'asset',
  Count = 'count',
  Other = 'other',
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

export interface AnnotatedFunctionABIReturning<T> extends AnnotatedFunctionABI {
  assetFromOutputs: (outputs: any) => T;
}

export enum EventInputKind {
  Source = 'source',
  Destination = 'destination',
  Asset = 'asset',
  Other = 'other',
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
  assetFromInputs: (inputs: any, web3: any) => Promise<T>;
}

export interface SchemaFunctions<T> {
  transfer: (asset: T) => AnnotatedFunctionABI;
  transferQuantity?: (asset: T, quantity: number) => AnnotatedFunctionABI;
  ownerOf?: (asset: T) => AnnotatedFunctionABI;
  countOf?: (asset: T) => AnnotatedFunctionABIReturning<number>;
  assetsOfOwnerByIndex: Array<AnnotatedFunctionABIReturning<T | null>>;
  initializeProxy?: (owner: string) => AnnotatedFunctionABI;
}

export interface SchemaEvents<T> {
  transfer: Array<AnnotatedEventABI<T>>;
}

export interface Property {
  key: string;
  kind: string;
  value: any;
}

export interface FormatInfo {
  thumbnail: string;
  title: string;
  description: string;
  url: string;
  properties: Property[];
}

export interface SchemaField {
  name: string;
  type: string;
  description: string;
  values?: any[];
  readOnly?: boolean;
}

export interface Schema<T> {
  version: number;
  deploymentBlock: number;
  name: string;
  description: string;
  thumbnail: string;
  website: string;
  fields: SchemaField[];
  unifyFields?: (fields: any) => any;
  checkAsset?: (asset: T) => boolean;
  assetFromFields: (fields: any) => T;
  assetToFields?: (asset: T) => any;
  allAssets?: (web3: any) => Promise<T[]>;
  functions: SchemaFunctions<T>;
  events: SchemaEvents<T>;
  formatter: (obj: T, web3: any) => Promise<FormatInfo>;
  hash: (obj: T) => any;
}
