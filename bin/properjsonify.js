#!/usr/bin/env node

'use strict';

const properJSONify = require('..');

let input = '';
process.stdin.on('data', (data) => { input += data; });
process.stdin.on('end', onEnd);
process.stdin.on('error', onError);

function onEnd() {
  console.log(JSON.stringify(properJSONify(JSON.parse(input)), null, 2));
}

function onError(e) {
  console.error(e);
  process.exit(1);
}
