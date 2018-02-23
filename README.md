![Project Wyvern Logo](https://media.githubusercontent.com/media/ProjectWyvern/wyvern-branding/master/logo/logo-square-red-transparent-200x200.png?raw=true "Project Wyvern Logo")

## Wyvern Protocol Nonfungible Asset Schemas

[![https://badges.frapsoft.com/os/mit/mit.svg?v=102](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/ProjectWyvern/wyvern-ethereum.svg?branch=master)](https://travis-ci.org/ProjectWyvern/wyvern-schemas) [![npm](https://img.shields.io/npm/v/wyvern-schemas.svg)](https://www.npmjs.com/package/wyvern-schemas) [![npm](https://img.shields.io/npm/dt/wyvern-schemas.svg)](https://www.npmjs.com/package/wyvern-schemas)

### Synopsis

Nonfungible asset schemas for the Wyvern Protocol, used directly by the [Wyvern Exchange](https://exchange.projectwyvern.com).

### Development Information

#### Dependency Installation

Install [Yarn](https://yarnpkg.com/en/) and update dependencies:

```bash
yarn
```

#### Adding an Asset Schema

Expect the schema format to undergo several revisions prior to release of the Exchange. For now, please submit a Github issue with the asset information.

#### Linting & Schema Validation

Run the lint script:

```bash
yarn lint
```

#### Testing

Build first, then test (tests are in vanilla JS) - you will need an internet connection, the testsuite makes RPC calls against Ethereum state via [Infura](https://infura.io):

```bash
yarn build && yarn test
```

#### General Contribution

Contributions welcome! Please use GitHub issues for suggestions/concerns - if you prefer to express your intentions in code, feel free to submit a pull request.
