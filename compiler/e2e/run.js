"use strict";

const assert = require('assert');

const actual = require(process.cwd() + '/' + process.argv[2])
const expected = require(process.cwd() + '/' + process.argv[3])

const actualKeys = {};
for (const key in actual) {
  console.log(key);
  const m = key.match(/[^$]+$/);
  if (m) {
    actualKeys[m[0]] = key;
  }
}

for (const key in expected) {
  console.log(`- ${key}`);
  //console.log(actual[key]);
  assert.deepEqual(actual[actualKeys[key]], expected[key]);
}
