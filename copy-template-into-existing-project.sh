#!/usr/bin/env bash
set -eu

# Usage
# Go to the project you want to improve via this template
# cd ~/git/my-project
# Run this script from the working directory of that project
# ~/git/typescript-node-module-boilerplate/copy-template-into-existing-project.sh

name=$(basename "$PWD")
templatedir="$(dirname "$0")"

cp -r \
	"$templatedir/"{package.json,tsconfig.json,.editorconfig,.gitattributes,.github,.gitignore,.npmrc} \
	.

echo "everything copied"

# Replace template name with folder name
# macOS: add '' after -i like this: sed -i '' "s/…
sed -i "s/typescript-node-module-boilerplate/$name/g" package.json .github/**/*.yml

git --no-pager status --short
