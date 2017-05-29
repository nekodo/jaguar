# Roadmap

## TODO
-   tests
    -   Unit tests: for the compiler modules from lexer through parser
        to optimization passes and JS backend. These can be more picky
        but we should still strive to keep this stuff relatively quiet.
    -   We can start with tests written in JS but the long term goal is
        to have them in JG.
-   type inference
-   improve JS backend
-   cross-module optimization as an option

## Done
-   bazel integration so that I can have a real build system
-   E2E tests run against both stage1 and stage2 compilers
-   slightly saner handling of builtins thanks to bazel
-   workspace-relative imports (//)
-   let expressions xD
