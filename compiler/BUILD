load("//compiler:jaguar.bzl", "jaguar_js_library", "jaguar_compiler")

jaguar_js_library(
    name = "stage1_lib",
    main = "compiler.jg",
    srcs = glob(["*.jg", "js/*.jg"]),
    compiler = "//compiler/bin:latest",
)

jaguar_compiler(
    name = "stage1",
    js_wrapper = "compiler.js",
    jaguar = ":stage1_lib",
    builtins =  "builtins.js",
    visibility = ["//visibility:public"],
)

jaguar_js_library(
    name = "stage2_lib",
    main = "compiler.jg",
    srcs = glob(["*.jg", "js/*.jg"]),
    compiler = ":stage1",
)

jaguar_compiler(
    name = "stage2",
    js_wrapper = "compiler.js",
    jaguar = ":stage2_lib",
    builtins =  "builtins.js",
    visibility = ["//visibility:public"],
)

jaguar_js_library(
    name = "stage3_lib",
    main = "compiler.jg",
    srcs = glob(["*.jg", "js/*.jg"]),
    compiler = ":stage2",
)

exports_files(
    srcs = glob(["*.jg"]),
    visibility = ["//visibility:public"],
)
