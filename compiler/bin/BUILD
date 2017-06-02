# Compiled compiler releases.

load("//compiler:jaguar.bzl", "jaguar_compiler")
load("//compiler/bin:old.bzl", "old_jaguar_compiler")

alias(
    name = "latest",
    actual = ":v0.13",
    visibility = ["//visibility:public"],
)

old_jaguar_compiler(
    name = "v0.7",
    js_wrapper = "c0.7.js",
    jaguar = "0.7.js",
    builtins =  "builtins.js",
)

old_jaguar_compiler(
    name = "v0.8",
    js_wrapper = "c0.8.js",
    jaguar = "c0.8.jg.js",
    builtins =  "builtins0.8.js",
)

jaguar_compiler(
    name = "v0.9",
    js_wrapper = "c0.9.js",
    jaguar = "c0.9.jg.js",
    builtins =  "builtins0.9.js",
)

jaguar_compiler(
    name = "v0.10",
    js_wrapper = "c0.10.js",
    jaguar = "c0.10.jg.js",
    builtins =  "builtins0.10.js",
)

jaguar_compiler(
    name = "v0.11",
    js_wrapper = "c0.11.js",
    jaguar = "c0.11.jg.js",
    builtins =  "builtins0.11.js",
)

jaguar_compiler(
    name = "v0.12",
    js_wrapper = "c0.12.js",
    jaguar = "c0.12.jg.js",
    builtins =  "builtins0.12.js",
)

jaguar_compiler(
    name = "v0.13",
    js_wrapper = "c0.13.js",
    jaguar = "c0.13.jg.js",
    builtins =  "builtins0.13.js",
)
