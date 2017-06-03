"use strict";

const assert = require('assert');

const actual = require(process.cwd() + '/' + process.argv[2])
const expected = require(process.cwd() + '/' + process.argv[3])

for (const key in expected) {
  console.log(`- ${key}`);
  //console.log(actual[key]);
  assert.deepEqual(actual[key], expected[key]);
}
