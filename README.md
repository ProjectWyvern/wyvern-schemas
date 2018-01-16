![Project Wyvern Logo](https://media.githubusercontent.com/media/ProjectWyvern/wyvern-branding/master/logo/logo-square-red-transparent-200x200.png?raw=true "Project Wyvern Logo")

## Project Wyvern Nonfungible Asset Schemas

[![https://badges.frapsoft.com/os/mit/mit.svg?v=102](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://opensource.org/licenses/MIT)

### Synopsis

Nonfungible asset schemas for the Wyvern protocol, used directly by the [Wyvern Exchange](https://exchange.projectwyvern.com).

### Development Information

#### Adding an Asset Schema

*Modified ABI JSON: extra "replaceable" flag, extra "asset" flag, required "target".*

Assumed `call` unless array specified, then `delegatecall` to atomic tx proxy.

Deep JSON-merge for schema / instantiation (see ERC721 example), schema check CI (TODO).

Schema template (required for inclusion in the Wyvern Exchange's "Basic" mode and Wyvern Exchange users backpacks):

```json
{
  "name": "...",
  "description": "...",
  "abis": {
    "transfer": {},
    "approve": {},
    "owner": {}
  },
}
```

Vue component template (optional, required for custom rendering):

```javascript
<template>
<div>
My Item
</div>
</template>

<script>
export default {
  name: 'myAsset'
}
</script>

<style scoped>
</style>
```

#### Linting & Schema Validation

First, install [Yarn](https://yarnpkg.com/en/) and update dependencies:

```bash
yarn
```

Then run the lint script:

```bash
yarn lint
```

#### General Contribution

Contributions welcome! Please use GitHub issues for suggestions/concerns - if you prefer to express your intentions in code, feel free to submit a pull request.
