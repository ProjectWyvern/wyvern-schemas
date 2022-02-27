import { AbiType } from 'ethereum-types';
import {
  AnnotatedFunctionABI,
  AnnotatedFunctionInput,
  FunctionInputKind
} from 'wyvern-js/lib/types';

export {
  AnnotatedFunctionInput,
  AnnotatedFunctionABI,
  FunctionInputKind,
};

export enum Network {
  Main = 'main',
  Rinkeby = 'rinkeby',
  Kovan = 'kovan',
}

export enum ABIType {
  Function = AbiType.Function,
  Event = AbiType.Event,
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
  type: AbiType.Event;
  name: string;
  target: string;
  anonymous: boolean;
  inputs: AnnotatedEventInput[];
  assetFromInputs: (inputs: any, web3: any) => Promise<T>;
}

export interface MerkleProof {
  root: string;
  proof: string[];
}

export interface SchemaFunctions<T> {
  transfer: (asset: T) => AnnotatedFunctionABI;
  checkAndTransfer?: (asset: T, validatorAddress: string, proof?: MerkleProof) => AnnotatedFunctionABI;
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
  checkAsset?: (asset: T) => boolean;
  assetFromFields: (fields: any) => T;
  assetToFields?: (asset: T) => any;
  allAssets?: (web3: any) => Promise<T[]>;
  functions: SchemaFunctions<T>;
  events: SchemaEvents<T>;
  formatter: (obj: T, web3: any) => Promise<FormatInfo>;
  hash: (obj: T) => any;
}
