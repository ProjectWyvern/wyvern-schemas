import {
  NetworkTokens,
} from '../../types';

export const rinkebyTokens: NetworkTokens = {
  canonicalWrappedEther: {name: 'Rinkeby Canonical Wrapped Ether', symbol: 'WETH', decimals: 18, address: '0xc778417e063141139fce010982780140aa0cd5ab'},
  otherTokens: [
    {name: 'Rinkeby Test Token', symbol: 'TST', decimals: 18, address: '0xb7dDCF6B64C05D76Adc497AE78AD83ba3883A294'},
    {name: 'CryptoKitty', symbol: 'CK', decimals: 0, address: '0x16baf0de678e52367adc69fd067e5edd1d33e3bf'}
  ],
};
