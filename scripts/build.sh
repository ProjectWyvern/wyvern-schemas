#!/bin/sh

echo 'Generating token list from tokenbase...'
node scripts/gen_from_tokenbase.js
echo 'Compiling Typescript...'
rm -rf dist
yarn run tsc
