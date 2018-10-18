Problem with let bindings is that they necessarily serialize the dependencies.
To isolate things we could split them into sub-lets, but that still works only
to a certain degree as we still imply ordering dependency between sublets. Also,
tree rewriting might introduce deps which violate the
previously generated binding serialization and requiring full flattening and
recomputation.

The issue is that bindings can be grouped into SCCs (groups of mutually
recursive definitions) which need to be processed together which form a DAG of
dependencies. Expressing this graph in the source is hard, but we could do it in
AST.

SCC = SCC Number (Array Number) (Array (Pair String Expr))
Defs = Defs (Array (String))
