"use strict";

const fs = require('fs');
const boostrappingCompiler = require('../bin/c0.7.js')
const compiler = require('../compiler.js');
const assert = require('assert');
const tmp = require('tmp');

const compilerRoot = `${__dirname}/../compiler.jg`;
const tests = ['basic_module_test'];

console.log('#### Compiler stage 1 ####\n');
console.log('compiling using 0.7...');
const stage1File = tmp.fileSync();
const compilerStage1 = boostrappingCompiler.outputBundle(
    boostrappingCompiler.compileSingle(compilerRoot),
    `${__dirname}/../bin/builtins.js`,
    stage1File.fd);
console.log(`compiled into ${stage1File.name}`);
runTests(stage1File.name);

console.log('\n')

console.log('#### Compiler stage 2 ####\n');
console.log('compiling using stage 1...');
const stage2File = tmp.fileSync();
const compilerStage2 = compiler.outputBundle(
    compiler.compileSingle(stage1File.name, compilerRoot),
    `${__dirname}/../builtins.js`,
    stage2File.fd);
console.log(`compiled into ${stage2File.name}`);
runTests(stage2File.name);

function runTests(compilerFilename) {
  for (const testName of tests) {
    console.log(`testing ${testName}`);
    const expected = require(`./${testName}_expected.js`);
    const jg = compiler.instantiate(
      compiler.compileSingle(
        compilerFilename, `${__dirname}/${testName}.jg`));
    for (const key in expected) {
      console.log(` - ${key}`);
      assert.equal(jg[key], expected[key]);
    }
  }
}
