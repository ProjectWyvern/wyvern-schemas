#!/bin/sh

echo 'Generating token list from tokenbase...'
node scripts/gen_from_tokenbase.js
echo 'Compiling Typescript...'
rm -rf dist-tsc dist
yarn run tsc
echo 'Transpiling with Babel...'
yarn run babel dist-tsc --out-dir dist --source-maps
cp -r src/schemas/main/Ethercraft/*.json dist/schemas/main/Ethercraft
