import { BigNumber } from '@0x/utils';
import * as ethABI from 'ethereumjs-abi';
import { WyvernProtocol } from 'wyvern-js';
import { WyvernAtomicizerContract } from 'wyvern-js/lib/abi_gen/wyvern_atomicizer';

import {
  AnnotatedFunctionABI,
  FunctionInputKind,
  Schema,
} from './types';

const failWith = (msg: string): any => {
  throw new Error(msg);
};

export const encodeReplacementPattern = WyvernProtocol.encodeReplacementPattern;
// const generateDefaultValue = (type: string): any => {
//   switch (type) {
//     case 'address':
//     case 'bytes20':
//       /* Null address is sometimes checked in transfer calls. */
//       return '0x1111111111111111111111111111111111111111';
//     case 'bytes32':
//       return '0x0000000000000000000000000000000000000000000000000000000000000000';
//     case 'bool':
//       return false;
//     case 'int':
//     case 'uint':
//     case 'uint8':
//     case 'uint16':
//     case 'uint32':
//     case 'uint64':
//     case 'uint256':
//       return 0;
//     default:
//       failWith('Default value not yet implemented for type: ' + type);
//   }
// };
// // Copied from wyvern-js 3.0.0-rc1, with generateDefaultValue changed
// export const encodeReplacementPattern: ReplacementEncoder = (abi, replaceKind = FunctionInputKind.Replaceable): string => {
//   const allowReplaceByte = '1';
//   const doNotAllowReplaceByte = '0';
//   /* Four bytes for method ID. */
//   const maskArr: string[] = [doNotAllowReplaceByte, doNotAllowReplaceByte,
//   doNotAllowReplaceByte, doNotAllowReplaceByte];
//   /* This DOES NOT currently support dynamic-length data (arrays). */
//   abi.inputs.map(i => {
//     const type = ethABI.elementaryName(i.type);
//     const encoded = ethABI.encodeSingle(type, generateDefaultValue(i.type));
//     if (i.kind === replaceKind) {
//       maskArr.push((allowReplaceByte as any).repeat(encoded.length));
//     } else {
//       maskArr.push((doNotAllowReplaceByte as any).repeat(encoded.length));
//     }
//   });
//   const mask = maskArr.reduce((x, y) => x + y, '');
//   const ret = [];
//   /* Encode into bytes. */
//   for (const char of mask) {
//     const byte = char === allowReplaceByte ? 255 : 0;
//     const buf = Buffer.alloc(1);
//     buf.writeUInt8(byte, 0);
//     ret.push(buf);
//   }
//   return '0x' + Buffer.concat(ret).toString('hex');
// }

export interface LimitedCallSpec {
  target: string;
  calldata: string;
}

export const encodeCall = (abi: AnnotatedFunctionABI, parameters: any[]): string => {
  const inputTypes = abi.inputs.map(i => i.type);
  return '0x' + Buffer.concat([
    ethABI.methodID(abi.name, inputTypes),
    ethABI.rawEncode(inputTypes, parameters),
  ]).toString('hex');
};

export interface CallSpec {
  target: string;
  calldata: string;
  replacementPattern: string;
}

export type SellEncoder<T> = (schema: Schema<T>, asset: T, address: string) => CallSpec;

export const encodeSell: SellEncoder<any> = (schema, asset, address) => {
  const transfer = schema.functions.transfer(asset);
  return {
    target: transfer.target,
    calldata: encodeDefaultCall(transfer, address),
    replacementPattern: encodeReplacementPattern(transfer),
  };
};

export type AtomicizedSellEncoder<T> = (schema: Schema<T>, assets: T[], address: string, atomicizer: WyvernAtomicizerContract) => Partial<CallSpec>;

export const encodeAtomicizedSell: AtomicizedSellEncoder<any> = (schema, assets, address, atomicizer) => {
  const transactions = assets.map(asset => {
    const { target, calldata } = encodeSell(schema, asset, address);
    return {
      calldata,
      abi: schema.functions.transfer(asset),
      address: target,
      value: new BigNumber(0),
    };
  });

  const atomicizedCalldata = atomicizer
    .atomicize(
      transactions.map(t => t.address),
      transactions.map(t => t.value),
      transactions.map(t => new BigNumber((t.calldata.length - 2) / 2)), // subtract 2 for '0x', divide by 2 for hex
      transactions.map(t => t.calldata).reduce((x, y) => {
        return x + y.slice(2);
      }), // cut off the '0x'
    )
    .getABIEncodedTransactionData();

  const atomicizedReplacementPattern = WyvernProtocol.encodeAtomicizedReplacementPattern(transactions.map(t => t.abi));

  return {
    calldata: atomicizedCalldata,
    replacementPattern: atomicizedReplacementPattern,
  };
};

export type AtomicizedBuyEncoder<T> = (schema: Schema<T>, assets: T[], address: string, atomicizer: WyvernAtomicizerContract) => Partial<CallSpec>;

export const encodeAtomicizedBuy: AtomicizedBuyEncoder<any> = (schema, assets, address, atomicizer) => {
  const transactions = assets.map(asset => {
    const { target, calldata } = encodeBuy(schema, asset, address);
    return {
      calldata,
      abi: schema.functions.transfer(asset),
      address: target,
      value: new BigNumber(0),
    };
  });

  const atomicizedCalldata = atomicizer
    .atomicize(
      transactions.map(t => t.address),
      transactions.map(t => t.value),
      transactions.map(t => new BigNumber((t.calldata.length - 2) / 2)), // subtract 2 for '0x', divide by 2 for hex
      transactions.map(t => t.calldata).reduce((x, y) => {
        return x + y.slice(2);
      }), // cut off the '0x'
    )
    .getABIEncodedTransactionData();

  const atomicizedReplacementPattern = WyvernProtocol.encodeAtomicizedReplacementPattern(transactions.map(t => t.abi), FunctionInputKind.Owner);

  return {
    calldata: atomicizedCalldata,
    replacementPattern: atomicizedReplacementPattern,
  };
};

export type BuyEncoder<T> = (schema: Schema<T>, asset: T, address: string) => CallSpec;

export const encodeBuy: BuyEncoder<any> = (schema, asset, address) => {
  const transfer = schema.functions.transfer(asset);
  const replaceables = transfer.inputs.filter((i: any) => i.kind === FunctionInputKind.Replaceable);
  const ownerInputs = transfer.inputs.filter((i: any) => i.kind === FunctionInputKind.Owner);

  // Validate
  if (replaceables.length !== 1) {
    failWith('Only 1 input can match transfer destination, but instead ' + replaceables.length + ' did');
  }

  // Compute calldata
  const parameters = transfer.inputs.map((input: any) => {
    switch (input.kind) {
      case FunctionInputKind.Replaceable:
        return address;
      case FunctionInputKind.Owner:
        return WyvernProtocol.generateDefaultValue(input.type);
      default:
        return input.value.toString();
    }
  });
  const calldata = encodeCall(transfer, parameters);

  // Compute replacement pattern
  let replacementPattern = '0x';
  if (ownerInputs.length > 0) {
    replacementPattern = encodeReplacementPattern(transfer, FunctionInputKind.Owner);
  }

  return {
    target: transfer.target,
    calldata,
    replacementPattern,
  };
};

export type DefaultCallEncoder = (abi: AnnotatedFunctionABI, address: string) => string;

export const encodeDefaultCall: DefaultCallEncoder = (abi, address) => {
  const parameters = abi.inputs.map(input => {
    switch (input.kind) {
      case FunctionInputKind.Replaceable:
        return WyvernProtocol.generateDefaultValue(input.type);
      case FunctionInputKind.Owner:
        return address;
      case FunctionInputKind.Asset:
      default:
        return input.value;
    }
  });
  return encodeCall(abi, parameters);
};

export type ReplacementEncoder = (abi: AnnotatedFunctionABI, kind?: FunctionInputKind) => string;
