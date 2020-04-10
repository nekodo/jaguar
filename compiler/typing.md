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
add :: k -> v -> Rec r -> Rec { k :: v | r }
set :: k -> v -> Rec { k :: w | r} -> Rec { k :: v | r }
del :: k -> Rec { k :: v | r } -> Rec r

or

get :: k -> Rec { k :: v | r } -> v
add :: k -> v -> Rec { k :: _ | r } -> Rec { k :: v | r }
set :: k -> v -> Rec { k :: w | r } -> Rec { k :: v | r }
del :: k -> Rec { k :: v | r } -> Rec { k :: _ | r }

unification rules:
  - {a :: b} = {c :: d} => error a/=c
  - {a :: b} = {a :: c} => b = c
  - {a :: b | r} = {a :: c} => b = c, r = {}
  - {a :: b | r} = {c :: d} => r = {c :: d}, error a absent
  - {a :: b | r} = {c :: d | r2} => r = {c :: d | r3}, r2 = {a :: b | r3}
  - split keys into shared, onlyA, onlyB
  - for shared keys unify the types
  - allocate var for restU
  - restA = onlyB | restU
  - restB = onlyA | restU
  - unified = {shared + onlyA + onlyB | restU}

get 

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

# Newtyper - a clean and unit-tested reimplementation

Features that need to be supported:
  - recursive lets
  - partial existing type information
  - type classes

General idea:
  - split all bindings into mutually recursive groups
  - solve each group in dep order
  - error in a given group stops inference for that
    group and all dependent groups - others proceed

Skolem vs tvar
  - skolems are known generic variables, cannot be
    eliminated - basically means that there is a
    forall somewhere above which defines them
  - tvars are unknown types which can be unified with
    other types to resolve them

Generalization
  - when a full mutually recursive group (MGR) is
    typed, then we are left with several bindings.
    We generalize each independently, which means
    replacing tvars with skolems and giving the
    entire thing a Forall.
    If there are any tvars in the body not represented in the
    binding type, the we have two options:
      1. Reject the binding as mistyped.
      2. Keep inferring on the assumption that they
         will get settled. We can try this option first and see if things behave reasonably.
  - When top-level binding is generalized, we must
    have all the tvars resolved. Otherwise it is an error.

Specialization
  - when a generalized type is used, we need to
    replace each skolem with a new tvar

Type class checking
  - env needs to contain a new list of available instances
  - when a type is instantiated we check that there is exactly one matching instance in the env
    for each bound
  - when descending into an expr with TForall type, for each bound we:
    - add (Instance [] b) to the env
  - instance matching rules:
    - use checkEquivM targetBound candidateBound with state reflecting which skolems are free

Type class inference
  - while instantiating we add the list of instantiated type bounds to required bounds
  - when generalizing MRG:
    - add all any bounds which mention the abstracted tvars to the tforalls as appropriate
    - carry over any bounds which do not mention the abstracted tvars over to the parent
  - finalization:
    - updated bounds
    - normalize the forall (sort and dedup)

Type class translation

Ideas for implicits
  f = \@x -> x :: @a -> a
  c = f :: Int // look up @Int in the env and use it
  
  What syntax to use to explicitly provide an implicit arg?
    f @foo // pass foo to f as the value for the implicit
  How about translating something with multiple constraints?
  mapM :: @(Traversable t) -> @(Monad m) -> ...
  foo :: Traversable x
  bar :: Monad y
  // To resolve both implicitly:
  x = mapM
  x = mapM @
  x = mapM @ @
  x = mapM @ @ @ // Error, too many implicit args.
  // To resolve first one explicitly.
  x = mapM @foo
  x = mapM @foo @
  // To resolve both explicitly.
  x = mapM @foo @bar

  // Syntax for declaring implicits.
  @x = ... // implicit value x made available
  @f @a @b = ... // implicit value f made available with two implicit params

  // Types
  Traversable t @> Monad m @> x // Better, enforces that it is really a magic on the LHS of a fun

  Handling in type checking:
    - if we have explicit @ application then check the type, otherwise resolve from scope
      as with the original type class handling, any ambiguity is an error
    - only rank 1 implicits are ever inferred

  f @a b @c = ...

# First class modules

Treat the module simply as a record/data instance. Importing can use less custom syntax:
  Foo = import '//foo.jg' // closed import
  {a, b} = import '//foo.jg' // open import
  {fooA = a, fooB = b} = import '//foo.jg' // open import with renaming
  {...} = import '//foo.jg' // open import everything

The syntax above is based on patter matching on records, which we do not have yet.

We will keep imports as legal only in the top scope, no dynamic imports (yet).

This will require record types, but we can then pass these around.

Type instances will be imported implicitly when either the class or the type is imported.

We will need dot syntax for accessing members (Foo.bar). This will also have to work in
types (e.g. Foo.Bar -> String).

We will need some magic for handling type classes. E.g. (Functor Foo) and (Functor Foo.Foo)
should conflict. We should be able to normalize type names for disambiguation, maybe to
(modulepath, typename). So Foo and Foo.Foo could both be (//foo.jg, Foo).

The alternative is to 

# Simple improvements
  
  - represent type bounds as normal types (Functor Maybe, forall a. Foo (Array a)).
