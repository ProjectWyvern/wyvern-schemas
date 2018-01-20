const ethABI = require('ethereumjs-abi')

const generateDefaultValue = (type) => {
  switch (type) {
    case 'address': return '0x0000000000000000000000000000000000000000'
  }
}

export const encodeDefaultCall = (abi, assetValues) => {
  const parameters = abi.inputs.map(input => {
    if (input.asset) {
      return assetValues.shift()
    } else if (input.replaceable) {
      return generateDefaultValue(input.type)
    } else {
      throw new Error('Parameter ' + input.name + ' must be specified as either asset-specific or replaceable')
    }
  })
  return '0x' + Buffer.concat([
    ethABI.methodID(abi.name, abi.inputs.map(i => i.type)),
    ethABI.rawEncode(abi.inputs.map(i => i.type), parameters)
  ]).toString('hex')
}

export const encodeReplacementPattern = (abi) => {
  return '0x'
}
