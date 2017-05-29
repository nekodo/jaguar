# Compiled compiler releases.

load("//compiler:jaguar.bzl", "jaguar_compiler")

alias(
    name = "latest",
    actual = ":v0.8",
    visibility = ["//visibility:public"],
)

jaguar_compiler(
    name = "v0.7",
    js_wrapper = "c0.7.js",
    jaguar_bundle = "0.7.js",
    builtins =  "builtins.js",
)

jaguar_compiler(
    name = "v0.8",
    js_wrapper = "c0.8.js",
    jaguar_bundle = "c0.8.jg.js",
    builtins =  "builtins0.8.js",
)
