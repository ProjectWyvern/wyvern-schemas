import * as ethABI from 'ethereumjs-abi';
import * as Web3 from 'web3';

import {
  AnnotatedFunctionABI,
  FunctionInputKind,
} from './types';

export const encodeCall = (abi: Web3.MethodAbi, parameters: any[]): string => {
  const inputTypes = abi.inputs.map(i => i.type);
  return '0x' + Buffer.concat([
    ethABI.methodID(abi.name, inputTypes),
    ethABI.rawEncode(inputTypes, parameters),
  ]).toString('hex');
};

const generateDefaultValue = (type: string): any => {
  switch (type) {
    case 'address':
      return '0x0000000000000000000000000000000000000000';
    case 'uint':
    case 'uint256':
      return 0;
  }
};

export type DefaultCallEncoder<T> = (abi: AnnotatedFunctionABI<T>, asset: T) => string;

export const encodeDefaultCall: DefaultCallEncoder<any> = (abi, asset) => {
  const assetParameters = abi.nftToInputs(asset);
  const parameters = abi.inputs.map(input => {
    switch (input.kind) {
      case FunctionInputKind.Asset:
        return assetParameters[input.name];
      case FunctionInputKind.Replaceable:
        return generateDefaultValue(input.type);
    }
  });
  return encodeCall(abi, parameters);
};

export type ReplacementEncoder<T> = (abi: AnnotatedFunctionABI<T>) => string;

export const encodeReplacementPattern: ReplacementEncoder<any> = abi => {
  const defaultCall = encodeCall(abi, abi.inputs.map(i => generateDefaultValue(i.type)));
  let len = defaultCall.length / 8;
  if (len % 2 === 1) {
    len += 1;
  }
  let ret = '0x';
  for (let i = 0; i < len; i++) {
    ret += 'f';
  }
  return ret;
};
