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

## Type class translation

### Idea 1
Each instance compiles down to an object containing the functions. The functions
are accessed on that object.

When the instance is determined statically within the module we can just access
the instance directly. When the bound is present on the binding though, we will
need to rewrite the function to take an extra param - the instance object.
When generating function calls to such a function we will need to supply these
extra instance objects from the callers' scope.

We can represent the dict with a data definition and we can perform the rewrite
ahead of time. E.g.:
  class Foo a where bar :: a -> Bool
  instance Foo Number where bar x = x == 0
  baz = bar 77
  boz y = bar y
translates into:
data $Class$Foo a = $Class$Foo (a -> Bool)
$Foo$Number = $Class$Foo (\x -> x == 0)
baz = (case $Foo$Number of $Class$Foo bar -> bar) 77
boz = \$instance$Foo -> \y -> (case $instance$Foo of $Class$Foo bar -> bar) y


# Heterogenous records

TRow (Array (Pair Type (Maybe Type))) (Maybe Type)
TLabel String

r :: Record {foo :: Number | a}

get :: k -> Rec { k :: v | r } -> v
set :: k -> v -> Rec r -> Rec { k :: v | r }
del :: k -> Rec { k :: v | r } -> Rec r

{a: b} = {c: d} => a = c, b = d
{a: b | r} = {c: d} => a = c, b = d

{a: b | r} = {c: d | r2} => (r2 = {a: b | r3}, r = {c: d | r3})


{a: b | r} = {c: d, e: f} => (a = c, b = d, r = {e: f}) or (a = e, b = f, r = {c: d})

foo k1 k2 v2 k3 v3 = get k1 {k2: v2, k3: v3}

Solvable:
{a: b} = {c: d}
{a: b | r} = {c: d | r2}

Unsolvable:
{a: b, c: d} = {e: f, g: h}
{a: b}

update :: k -> v -> {k :: v2 | r} -> {k :: v | r}
insert :: 

Non-polymorphic keys only, no insert or delete

{r ~ a, b, c}

set :: k -> v -> {k :: v2 | r} -> {k :: v | r}
get :: k -> {k :: v | r} -> v
del :: k -> {k :: v | r} -> r
add :: k -> v -> {r} -> {k :: v | r}

{a: b | r} = {"c": d | r2}

Cases we can solve:
 1. when there are no row vars and:
    1. cardinality of both sides is 1
    2. cardinality of both sides is equal and there is only one tvar as key
 2. when there are row vars and:
    1. there are no tvars as keys