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


