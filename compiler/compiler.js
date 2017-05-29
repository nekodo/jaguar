"use strict";

const fs = require('fs');
const vm = require('vm');
const path = require("path");

function main() {
  const fileName = fs.realpathSync(process.argv[2]);
  let out = null;
  if (process.argv[3]) {
    out = fs.openSync(process.argv[3], 'w');
  }
  console.log("compiling with", process.argv[4], 'in', process.cwd());
  const builtins = process.argv[5];
  loadBuiltins(process.cwd() + '/' + builtins);
  const compiler = require(fs.realpathSync(process.argv[4]));
  outputBundle(compileSingle(compiler, path.basename(fileName), path.dirname(fileName)), builtins, out);
}

function compileSingle(compiler, fileName, dirname) {
  const contents = fs.readFileSync(dirname + '/' + fileName, 'utf8');
  const imports = compiler.findImports(contents);
  const importSymbols = {};
  imports.forEach(i => {
    importSymbols[i] = getExports(compiler, dirname, i);
  });
  return {
    fileName,
    source: compiler.transpileModule(importSymbols)(contents),
    imports
  };
}

function outputBundle(compiled, builtinsPath, outputFile) {
  const jaguarSources = [compiled];
  const dirname = path.dirname(compiled.fileName);
  for (let i = 0; i < jaguarSources.length; i++) {
    const s = jaguarSources[i];
    s.imports.forEach(i => {
      if (i.endsWith('.jg') && !jaguarSources.some(src => src.fileName == i)) {
        jaguarSources.push(cache[i].compiled);
      }
    });
  }
  const orderedSources = [];
  while (orderedSources.length != jaguarSources.length) {
    const srcs = jaguarSources.filter(s =>
        orderedSources.indexOf(s) == -1 && !s.imports.some(i =>
            i.endsWith('.jg') &&
            !orderedSources.some(s => s.fileName == i)));
    if (srcs.length) {
      srcs.forEach(s => orderedSources.push(s));
    } else {
      console.log(jaguarSources.map(s => s.fileName), orderedSources.map(s => s.fileName));
      throw Error('Cannot order Jaguar sources');
    }
  }
  let fullSource = 'var cache = {}\n' +
      'function _require(f) {\n' +
      `  return cache[f] || require(f == "./builtins.js" ? process.cwd() + "/" + "${builtinsPath}" : f);\n` +
      '}\n';
  orderedSources.forEach(s => {
    fullSource += 'cache["' + s.fileName + '"] = ' +
        wrapModule(s.source) + ';\n';
  });
  fullSource += 'module.exports = cache["' + compiled.fileName + '"]';
  if (outputFile) {
    fs.write(outputFile, fullSource);
  } else {
    fs.writeFile('a.out', fullSource);
  }
}

function wrapModule(source) {
  return '(function() {' + source + '\nreturn exports;})()';
}

function instantiate(compiled) {
  return vm.runInNewContext(wrapModule(compiled.source), {_require});
}

function _require(f) {
  if (f.endsWith('.js')) {
    return require(f);
  } else {
    return cache[f].module;
  }
}

const cache = {};
function loadBuiltins(f) {
  const module = require(f);
  cache['./builtins.js'] = {
    module: module,
    exports: Object.keys(module)
  };
}
function getExports(compiler, dirname, f) {
  if (cache[f]) {
    return cache[f].exports;
  }
  if (f.endsWith('.js')) {
    const module = require(dirname + '/' + f);
    cache[f] = {
      module: module,
      exports: Object.keys(module)
    };
    return Object.keys(module);
  } else if (f.endsWith('.jg')) {
    const compiled = compileSingle(compiler, f, dirname);
    const module = instantiate(compiled);
    cache[f] = {
      compiled,
      module,
      exports: Object.keys(module)
    };
    return Object.keys(module);
  } else {
    throw Error('Unknown import: ' + f);
  }
}

if (process.argv[2])
  main();

module.exports = {compileSingle, instantiate, outputBundle};
