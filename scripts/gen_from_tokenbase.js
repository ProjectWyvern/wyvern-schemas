const yaml = require('js-yaml')
const fs = require('fs')

const files = fs.readdirSync('./tokenbase/tokens').filter(f => f.endsWith('.yaml'))
const yamls = files.map(f => yaml.safeLoad(fs.readFileSync('./tokenbase/tokens/' + f)))

const otherTokens = yamls.map(y => `    {name: '${y.name}', symbol: '${y.symbol}', decimals: ${y.decimals}, address: '${y.addr}'},`).join('\n')

fs.writeFileSync('./src/tokens/main/index.ts', `import {
  NetworkTokens,
} from '../../types';

export const mainTokens: NetworkTokens = {
  canonicalWrappedEther: {name: 'Canonical Wrapped Ether', symbol: 'WETH', decimals: 18, address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'},
  otherTokens: [
${otherTokens}
  ],
}; // tslint:disable:max-file-line-count`)
