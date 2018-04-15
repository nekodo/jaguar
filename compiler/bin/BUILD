# Compiled compiler releases.

load("//compiler/bin:old.bzl", "jaguar_compiler0_15")

alias(
    name = "latest",
    actual = ":v0.33",
    visibility = ["//visibility:public"],
)

jaguar_compiler0_15(
    name = "v0.33",
    jaguar = "c0.33.jg.js",
    builtins =  "builtins0.24.js",
)
