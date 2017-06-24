# Compiled compiler releases.

load("//compiler/bin:old.bzl", "jaguar_compiler0_15")

alias(
    name = "latest",
    actual = ":v0.22",
    visibility = ["//visibility:public"],
)

jaguar_compiler0_15(
    name = "v0.22",
    jaguar = "c0.22.jg.js",
    builtins =  "builtins0.18.js",
)
