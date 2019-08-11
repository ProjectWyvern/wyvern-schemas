#!/bin/sh

echo 'Generating token list from tokenbase...'
node scripts/gen_from_tokenbase.js
echo 'Compiling Typescript...'
rm -rf dist-tsc dist
yarn run tsc
for DIR in $(ls src/schemas/main); do
  cp -r src/schemas/main/$DIR/*.json dist/schemas/main/$DIR
done
echo 'Done'