# Ideal layout of BUILD rules and compilation outputs

type
foo.jg => foo.tg // contains the types expected from builtins

merge (link)
foo.tg,bar.tg => fb.tg // checks that all builtin types that are expected are identical

javascript
fb.tg => fb.tg.js // inserts the builtins at the top of the file

binary
fb.tg.js => fb.sh // node_binary should do^^

jaguar_library(
  srcs = [],
  deps = [],
  builtins = "", // defaults to //compiler/builtins.js
)
1. Check that the deps have compatible builtins types.
2. Pass each src through type()
3. Merge the typed modules from srcs.
4. Output the combined typed IR.

jaguar_js_binary(
  srcs = [],
  deps = [],
  builtins = "", // defaults to //compiler/builtins.js
  main_module = "",
)
1. If there are any srcs or more than 1 dep then pass them through jaguar_library().
2. Take the resulting single typed IR and optimize it.
3. Translate to JS and output.

jaguar_binary(
  srcs = [],
  deps = [],
  builtins = "", // defaults to //compiler/builtins.js
  main_module = "",
)
1. Pass input through jaguar_js_binary()
2. Wrap in node_binary

# Optimization

Three variants.

## S Single module API-preserving

Within a single module (file).
Preserves module API (all public names).
Inlining of public symbols limited to non-size increasing or high-value.

## M Multi-module API-preserving

Across several modules.
Preserves module APIs (all public names).
Inlining of public symbols limited to non-size increasing or high-value.

## F Full rectification

Across any number of modules.
Preserves module APIs only for selected modules (usually one).
Performs full optimizations.