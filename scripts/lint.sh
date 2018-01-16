#!/bin/sh

set -e

yarn run jsonlint -q schemas/**/*.json

echo "Lint OK!"
