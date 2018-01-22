#!/bin/sh

set -e

yarn run tslint --project . 'src/**/*.ts' --fix

echo "Lint OK!"
