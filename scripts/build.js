const fs = require('fs')

fs.mkdirSync('./build')
fs.mkdirSync('./build/templates')

var schemas = fs.readdirSync('./schemas')
schemas = schemas.map(name => {
  const config = JSON.parse(fs.readFileSync('./schemas/' + name + '/config.json'))
  fs.copyFileSync('./schemas/' + name + '/template.vue', './build/templates/' + config.name + '.vue')
  return {
    config: config
  }
})

fs.writeFileSync('./build/schemas.json', JSON.stringify(schemas))
fs.writeFileSync('./build/tokens.json', JSON.stringify(JSON.parse(fs.readFileSync('./tokens/tokens.json'))))
fs.writeFileSync('./build/schemaFunctions.js', fs.readFileSync('./src/schemaFunctions.js'))
