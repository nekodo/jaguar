# Compiled compiler releases.

load("//compiler/bin:old.bzl", "jaguar_compiler0_15")

alias(
    name = "latest",
    actual = ":v0.31",
    visibility = ["//visibility:public"],
)

jaguar_compiler0_15(
    name = "v0.31",
    jaguar = "c0.31.jg.js",
    builtins =  "builtins0.24.js",
)
