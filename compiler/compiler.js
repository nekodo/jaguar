"use strict";

const fs = require('fs');
const vm = require('vm');
const path = require("path");

function requireFromWorkspace(file) {
  return require(process.cwd() + '/' + file);
}

function main() {
  const compilerFile = process.argv[2]
  const builtins = process.argv[3];
  const out = fs.openSync(process.argv[4], 'w');
  const mainFile = process.argv[5];
  const srcs = new Set(process.argv.slice(5))
  
  console.log('main:', mainFile);

  loadBuiltins(builtins);
  const compiler = requireFromWorkspace(compilerFile);
  outputBundle(compileSingle(compiler, mainFile, path.dirname(mainFile), srcs), builtins, out);
}

function compileBundle(compiler, main) {
  // Construct import graph.
  // Compile each module.
}

function resolveImport(importer, importee) {
  if (importee.startsWith('.') && importee != './builtins.js') {
    return path.join(path.dirname(importer), importee);
  } else {
    return importee;
  }
}

function compileSingle(compiler, fileName, dirname, srcs) {
  let actualFile = fileName;
  if (fileName.startsWith('//')) {
    actualFile = fileName.substring(2);
  }
  const contents = fs.readFileSync(actualFile, 'utf8');
  const imports = compiler.findImports(contents);
  const importSymbols = {};
  imports.forEach(i => {
    if (i != './builtins.js' && !srcs.has(actualFile)) {
      throw Error(`Unknown import ${i} in ${Array.from(srcs)}`);
    }
    importSymbols[i] = getExports(compiler, dirname, i, srcs);
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
      `  return cache[f] || require(f == "./builtins.js" ? process.cwd() + "/" + "${builtinsPath}" : f);\n` +
      '}\n';
  orderedSources.forEach(s => {
    fullSource += 'cache["' + s.fileName + '"] = ' +
        wrapModule(s.source) + ';\n';
  });
  fullSource += 'module.exports = cache["' + compiled.fileName + '"]';

  fs.write(outputFile, fullSource);
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
  const module = requireFromWorkspace(f);
  cache['./builtins.js'] = {
    module: module,
    exports: Object.keys(module)
  };
}
function getExports(compiler, dirname, f, srcs) {
  if (cache[f]) {
    return cache[f].exports;
  }
  if (f.endsWith('.js')) {
    // const module = require(dirname + '/' + f);
    // cache[f] = {
    //   module: module,
    //   exports: Object.keys(module)
    // };
    // return Object.keys(module);
    throw Error('probably wouldn\'t work');
  } else if (f.endsWith('.jg')) {
    const compiled = compileSingle(compiler, f, dirname, srcs);
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
