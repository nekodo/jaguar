# Compiled compiler releases.

load("//compiler/bin:old.bzl", "jaguar_compiler0_15")

alias(
    name = "latest",
    actual = ":v0.27",
    visibility = ["//visibility:public"],
)

jaguar_compiler0_15(
    name = "v0.27",
    jaguar = "c0.27.jg.js",
    builtins =  "builtins0.24.js",
)
