# Compilation passes

## Current

1. parse :: [string] -> [AST]
2. depSort :: [AST] -> [AST]
3. translateAdts :: AST with ADTs -> AST without ADTs
4. normalizeImports :: AST with all sorts of imports -> AST with only one type of imports
5. uniquify :: AST with shadowed IDs -> AST with unique IDs
6. splitLets :: AST with arbitrary lets -> AST with lets grouped by dependency
7. typer :: partially typed AST -> fully typed AST
8. declasser :: AST with classes -> AST without classes
9. mergeModules :: [AST] -> AST
10. opt :: AST -> AST
11. instrument :: AST -> AST
12. generateJs :: AST -> string
13. report

passes = perModule (timed 'parse' $ liftPass parse) >=>
           timed 'dep-sort' (liftPass (depSort mainName)) >=>
           perModule (
             // Normalization passes.
             timed 'translate-adts' (liftPass translateAdts) >=>
               timed 'normalize-imports' normalizeImportsPass >=>
               timed 'uniquify' uniquify >=>
               timed 'split-lets' splitLetsPass >=>
               // Typing and type clas handling.
               timed 'typer' typerPass >=>
               timed 'declasser' declasserPass) >=>
           // Optimization passes.
           timed 'merge-modules' (liftPass mergeModules) >=>
           timed 'opt' (inline opt) >=>
           // Code generation.
           timed 'instrument' (instrumentPass profile) >=>
           timed 'generate-js' (liftPass (generateJs builtinsPath)) >=>
           reportTimes

## Future

### Module

1. normalize
2. typer
3. ??declasser
4. light opt

### Library (a set of modules)

1. parse each module
2. dep sort
3. [module passes] for each
4. light opt

### Bundle (a library down to a single file)
1. ??declasser for each
2. merge modules
3. full opt
4. instrument
5. generate code
