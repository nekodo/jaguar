# Compiled compiler releases.

load("//compiler/bin:old.bzl", "jaguar_compiler0_15")

alias(
    name = "latest",
    actual = ":v0.30",
    visibility = ["//visibility:public"],
)

jaguar_compiler0_15(
    name = "v0.30",
    jaguar = "c0.30.jg.js",
    builtins =  "builtins0.24.js",
)
