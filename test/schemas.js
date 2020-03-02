/* globals describe:false,it:false */
const { INFURA_API_KEY } = process.env
if (!INFURA_API_KEY) {
  throw new Error('Need to set INFURA_API_KEY')
}
const assert = require('assert')
const Web3 = require('web3')
const ZeroClientProvider = require('web3-provider-engine/zero.js')

const engine = ZeroClientProvider({
  getAccounts: () => {},
  rpcUrl: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`
})
const web3 = new Web3(engine)

const { schemas } = require('../dist/index.js')

const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }
      resolve(res)
    })
  )

schemas.main.map(schema => {
  describe(schema.name, () => {
    it('should have a unique name', () => {
      const matching = schemas.main.filter(s => s.name === schema.name)
      assert.equal(matching.length, 1, 'Schema name ' + schema.name + ' is not unique')
    })

    const transfer = schema.events.transfer[0]
    if (transfer) {
      const transferContract = web3.eth.contract([transfer]).at(transfer.target)
      it('should have some transfer events', async () => {
        const fromBlock = schema.deploymentBlock
        const toBlock = fromBlock + 10000
        const events = await promisify(c => transferContract[transfer.name]({}, {fromBlock, toBlock}).get(c))
        console.log(events.length + ' transfer events for schema ' + schema.name + ' in first 10000 blocks')
        assert.equal(events.length > 0, true, 'No transfer events found in first 10000 blocks')
      })
    }
  })
})
