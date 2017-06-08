Things tha need to be done (usually bugs or known issues):

-   Satisfies check is too naive and does not enforce that a tvar used multiple
    times is the same (e.g. (Pair a a) will match (Pair Number String)).
-   No way to import classes and instances - for now all are implicitly pulled
    in when a module is imported.
-   Currently first matching instance is used, make it an error if there is >1
