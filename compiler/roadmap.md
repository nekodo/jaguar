# Roadmap

## TODO
-   beta reduction pass
-   row types for extensible records and maybe other things
-   proper associativity for operators

## Done
-   bazel integration so that I can have a real build system
-   E2E tests run against both stage1 and stage2 compilers
-   slightly saner handling of builtins thanks to bazel
-   workspace-relative imports (//)
-   0.10
    -   let expressions xD
    -   syntax sugar for function defs
-   0.11 (TBD)
-   type inference - done!
-   I should start writing these relases notes again xD
-   we're at 0.15 now
-   type classes
-   user-defined operators
-   Hash-Array-Mapped-Tries as the data structure of choice:)
-   better error messages from the typer
-   module merging pass
-   inlining pass
-   patterns in bindings and lambda and fun params
-   optimizations to get the compilation of the compiler below 10s
    - it's now < 2s
-   tests
    -   Unit tests: for the compiler modules from lexer through parser
        to optimization passes and JS backend. These can be more picky
        but we should still strive to keep this stuff relatively quiet.
    -   We can start with tests written in JS but the long term goal is
        to have them in JG.
-   cross-module optimization as an option
    - not an option, but it exists


# Ideas

## Record syntax for ADTs

### Motivation

Adding a new filed to an ADT is a pain as I need to go through all the existing
pattern matches and update them. Furthermore, with larger data types it becomes
a pain to pack and unpack them all the time.

data Foo = FooA | FooB String Number
data Foo =
  FooA
  | FooB
    name :: String
    size :: Number

case f of
  {FooB with name} -> name
  {FooB with name = v} -> v
  {FooB with name, size = s} -> bar name s
  {FooB with name = 'Kuro', size} -> size
  FooB 'Kuro' size -> size

name f
size f

f[name = 'Kuro', size = 7]
FooB[name = 'Kuro', size = 7]

## Separate lower level core language

Currently we have things that either get desugared very early (when parsing) or we have things in the
internal representation which should never appear after a certain point in the compilation.

Additionally, the jump from Jaguar to the output (JS) is quite big, which will make multiple
backends harder.

We could define a simpler core language (Fang? Panther?) so that we could do:
string -> [parse] -> jaguar -> [type] -> [rectify] -> fang -> [optimize] -> [backend] -> output

Fang:
  - motivated by efficient opt and translation to output
  - everything is a value, no declarations (is that possible?)
  - explicitly typed? or untyped?
  - no type classes
  - explicit tagged unions support, but as values

Expr =
  Const
  Var
  App
  Let
  New
  Case
  Lam
  Field {of :: Expr, name :: String}



Maybe a = Just a | Nothing

Just = 

case x of
  Just z -> z
