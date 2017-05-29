load("//compiler:jaguar.bzl", "jaguar_library", "jaguar_compiler")

jaguar_library(
    name = "stage1_lib",
    main = "compiler.jg",
    srcs = glob(["*.jg", "js/*.jg"]),
    compiler = "//compiler/bin:latest2",
)

jaguar_compiler(
    name = "stage1",
    js_wrapper = "compiler.js",
    jaguar_bundle = ":stage1_lib",
    builtins =  "builtins.js",
)

jaguar_library(
    name = "stage2_lib",
    main = "compiler.jg",
    srcs = glob(["*.jg", "js/*.jg"]),
    compiler = ":stage1",
)

jaguar_compiler(
    name = "stage2",
    js_wrapper = "compiler.js",
    jaguar_bundle = ":stage2_lib",
    builtins =  "builtins.js",
    visibility = ["//visibility:public"],
)
