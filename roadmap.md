# Roadmap

-   tests
    -   E2E compiler tests: given a compiler blob run this array of tests
        on it to verify that it functions correctly. Most likely a bunch
        of simple JG expressions that can be eval'd to check that they
        produce the right value, maybe a module that also has members
        that eval to known values.
        Should be functional, i.e. changes to formatting or emitted
        code constructs should not result in test failures.
    -   Unit tests: for the compiler modules from lexer through parser
        to optimization passes and JS backend. These can be more picky
        but we should still strive to keep this stuff relatively quiet.
    -   We can start with tests written in JS but the long term goal is
        to have them in JG.
-   let statements xD
-   type inference
-   improve JS backend
-   cross-module optimization as an option
