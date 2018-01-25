import * as ethABI from 'ethereumjs-abi';
import * as Web3 from 'web3';

import {
  AnnotatedFunctionABI,
  FunctionInputKind,
} from './types';

const failWith = (msg: string): any => {
  throw new Error(msg);
};

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
    case 'bool':
      return false;
    case 'int':
    case 'uint':
    case 'uint8':
    case 'uint16':
    case 'uint256':
      return 0;
    default:
      failWith('Default value not yet implemented for type: ' + type);
  }
};

export type DefaultCallEncoder = (abi: AnnotatedFunctionABI) => string;

export const encodeDefaultCall: DefaultCallEncoder = abi => {
  const parameters = abi.inputs.map(input => {
    switch (input.kind) {
      case FunctionInputKind.Asset:
        return input.value;
      case FunctionInputKind.Replaceable:
        return generateDefaultValue(input.type);
    }
  });
  return encodeCall(abi, parameters);
};

export type ReplacementEncoder<T> = (abi: AnnotatedFunctionABI) => string;

export const encodeReplacementPattern: ReplacementEncoder<any> = abi => {
  const allowReplaceBit = '1';
  const doNotAllowReplaceBit = '0';
  /* Four bytes for method ID. */
  const maskArr: string[] = [doNotAllowReplaceBit, doNotAllowReplaceBit,
    doNotAllowReplaceBit, doNotAllowReplaceBit];
  /* This DOES NOT currently support dynamic-length data (arrays). */
  abi.inputs.map(i => {
    const type = ethABI.elementaryName(i.type);
    const encoded = ethABI.encodeSingle(type, generateDefaultValue(i.type));
    if (i.kind === FunctionInputKind.Replaceable) {
      maskArr.push((allowReplaceBit as any).repeat(encoded.length));
    } else {
      maskArr.push((doNotAllowReplaceBit as any).repeat(encoded.length));
    }
  });
  let mask = maskArr.reduce((x, y) => x + y, '');
  const ret = [];
  /* Encode into bytes. */
  while (true) {
    let byteChars = (mask.substr(0, 8) as any);
    if (byteChars.length === 0) {
      break;
    }
    byteChars = byteChars.padEnd(8, '0');
    let byte = 0;
    let mul = 2 ** 7;
    for (let i = 0; i < 8; i++) {
      byte += byteChars[i] === allowReplaceBit ? mul : 0;
      mul = mul / 2;
    }
    const buf = Buffer.alloc(1);
    buf.writeUInt8(byte, 0);
    ret.push(buf);
    mask = mask.slice(8);
  }
  return '0x' + Buffer.concat(ret).toString('hex');
};
