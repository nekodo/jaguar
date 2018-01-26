# Compiled compiler releases.

load("//compiler/bin:old.bzl", "jaguar_compiler0_15")

alias(
    name = "latest",
    actual = ":v0.32",
    visibility = ["//visibility:public"],
)

jaguar_compiler0_15(
    name = "v0.32",
    jaguar = "c0.32.jg.js",
    builtins =  "builtins0.24.js",
)
