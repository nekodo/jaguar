"use strict";

const fs = require('fs');
const vm = require('vm');

function compileSingle(compilerFilename, fileName) {
  const compiler = require(compilerFilename);
  const contents = fs.readFileSync(fileName, 'utf8');
  const imports = compiler.findImports(contents);
  const importSymbols = {};
  imports.forEach(i => {
    importSymbols[i] = getExports(compilerFilename, i);
  });
  return {
    fileName,
    source: compiler.transpileModule(importSymbols)(contents),
    imports
  };
}

function outputBundle(compiled, builtinsPath, outputFile) {
  const jaguarSources = [compiled];
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
      `  return cache[f] || require(f == "../builtins.js" ? "${builtinsPath}" : f);\n` +
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
  if (f == '../builtins.js') {
    return require('./builtins.js');
  }
  else if (f.endsWith('.js')) {
    return require(f);
  } else {
    return cache[f].module;
  }
}

const cache = {};
function getExports(compilerFilename, f) {
  if (cache[f]) {
    return cache[f].exports;
  }
  if (f.endsWith('.js')) {
    const module = require(f == '../builtins.js' ? './builtins.js': f);
    cache[f] = {
      module: module,
      exports: Object.keys(module)
    };
    return Object.keys(module);
  } else if (f.endsWith('.jg')) {
    const compiled = compileSingle(compilerFilename, f);
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

module.exports = {compileSingle, instantiate, outputBundle};
