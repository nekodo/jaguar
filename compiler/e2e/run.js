"use strict";

const assert = require('assert');

const expected = require(process.cwd() + '/' + process.argv[2])
const actual = require(process.cwd() + '/' + process.argv[3])

for (const key in expected) {
  console.log(`- ${key}`);
  assert.equal(actual[key], expected[key]);
}
