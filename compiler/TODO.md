Things tha need to be done (usually bugs or known issues):

-   Current known problems:
    -   If optimization is enabled then the produced optimized compiler has a bug (incorrect inlining)
    -   If a certain line is added to the prelude it results in typing error in uniquifier.jg, The cause
        is unknown and, what is worse, there is no simple repro case.
        What we need is a way to capture bad behaviour and be able to augment
        the compiler on the fly until it is helpful enough to resolve the issue.

-   Satisfies check is too naive and does not enforce that a tvar used multiple
    times is the same (e.g. (Pair a a) will match (Pair Number String)).
-   No way to import classes and instances - for now all are implicitly pulled
    in when a module is imported.
-   Currently first matching instance is used, make it an error if there is >1
