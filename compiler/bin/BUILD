# Compiled compiler releases.

load("//compiler/bin:old.bzl", "jaguar_compiler0_15")

alias(
    name = "latest",
    actual = ":v0.23",
    visibility = ["//visibility:public"],
)

jaguar_compiler0_15(
    name = "v0.23",
    jaguar = "c0.23.jg.js",
    builtins =  "builtins0.18.js",
)
