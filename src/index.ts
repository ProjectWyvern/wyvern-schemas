import * as Web3 from 'web3';

/* HACK */
// @ts-ignore
Web3.AbiType = {
  Function: 'function',
  Event: 'event',
};

export {
  encodeBuy,
  encodeSell,
  encodeAtomicizedBuy,
  encodeAtomicizedSell,
  encodeCall,
  encodeDefaultCall,
  encodeReplacementPattern,
} from './schemaFunctions';
export { schemas } from './schemas/index';
export { tokens } from './tokens/index';

export {
  AbiType,
} from 'web3';
