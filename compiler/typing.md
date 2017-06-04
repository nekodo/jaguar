# Current state

Implementation of algorithm W with support for recursive lets.

Things that caused issues:
  - SCC algorithms can be subtle
  - recursive lets require very principled approach to composing substitutions
  - keeping all substitution forever in a massive map is not a good plan

# Type classes
## Idea 1
Add bounds (Array ClassName) to type variables and foralls. Instantiating
a forall copies the bounds over to tvars. Generalizing moves them the other way.
Unification with non-tvar checks existence of matching instance. With a tvar
produces a sub with the union of bounds. Applying subs again takes a union of
bounds.

Issues:
  - bounds on non-tvar type might need to be preserved for type-directed
    code transformations (e.g. handling type classes). See needing an instance
    of Show for Expr.
  - unify (c[Show]) (App a b

## Idea 2
Bounds only on TForall. Separate list of required instances stored in the
context. When we find we need (Foo a) instance (or Foo String or whatever) we
add it to the context. It's subject to the same substitutions. Instance
requirements are resolved when generalizing as an extra step. Once the type
is generalized we find which instances involve the type vars that we quantify
over and add those as bounds. When we instantiate a TForall with bounds we
add the bounds to the context.

### Issues
  - Associated types might be hard to implement. Though maybe it's just a
    special derived instance of a two-param type class.

Going to try this one!

### Algorithm changes for typing a module

1.  Bring into env bindings from imports.
2.  Type check new class defs (each binding mentions the class var at least once).
3.  Bring into env bindings from new classes with bounds.
4.  Bring into env new instances (do not type-check yet).
5.  Infer types for bindings
    -   When instantiate finds a bound, add it to bounds in ctx.
    -   When generalizing:
        -   Find all satisfied bounds and drop them.
        -   Find all bounds involving quantified vars + vars from env, all vars
            involved in these contexts are not free.
        -   Find all bounds involving only the quantified vars, add those to the
            forall. Drop these bounds from ctx.
6.  For all non-lambda module bindings, if there are any remaining bounds then
    these are unsatisfied - error.
7.  Type check instance declarations.

And it seems to work!^^

### Type class translation

TODO
