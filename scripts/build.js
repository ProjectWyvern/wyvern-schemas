const fs = require('fs')

if (!fs.existsSync('./build')) {
  fs.mkdirSync('./build')
}

var schemas = fs.readdirSync('./schemas')
schemas = schemas.map(name => {
  const config = JSON.parse(fs.readFileSync('./schemas/' + name + '/config.json'))
  return {
    config: config
  }
})

fs.writeFileSync('./build/schemas.json', JSON.stringify(schemas))
fs.writeFileSync('./build/tokens.json', JSON.stringify(JSON.parse(fs.readFileSync('./tokens/tokens.json'))))
fs.writeFileSync('./build/schemaFunctions.js', fs.readFileSync('./src/schemaFunctions.js'))
