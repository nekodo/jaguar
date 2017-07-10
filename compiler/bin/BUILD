# Compiled compiler releases.

load("//compiler/bin:old.bzl", "jaguar_compiler0_15")

alias(
    name = "latest",
    actual = ":v0.26",
    visibility = ["//visibility:public"],
)

jaguar_compiler0_15(
    name = "v0.26",
    jaguar = "c0.26.jg.js",
    builtins =  "builtins0.24.js",
)
