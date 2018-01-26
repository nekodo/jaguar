load("//compiler:jaguar.bzl", "jaguar_js_library", "jaguar_compiler", "jaguar_binary")

jaguar_js_library(
    name = "stage1_lib",
    main = "compiler.jg",
    srcs = glob(["*.jg", "js/*.jg"]),
    compiler = "//compiler/bin:latest",
)

jaguar_compiler(
    name = "stage1",
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
    jaguar = ":stage2_lib",
    builtins =  "builtins.js",
    visibility = ["//visibility:public"],
)

jaguar_js_library(
    name = "opt_lib",
    main = "compiler.jg",
    srcs = glob(["*.jg", "js/*.jg"]),
    compiler = ":stage2",
    args = ["--opt"],
)

jaguar_compiler(
    name = "opt",
    jaguar = ":opt_lib",
    builtins =  "builtins.js",
    visibility = ["//visibility:public"],
)

jaguar_js_library(
    name = "opt_opt_lib",
    main = "compiler.jg",
    srcs = glob(["*.jg", "js/*.jg"]),
    compiler = ":opt",
    args = ["--opt"],
)

jaguar_js_library(
    name = "test_stage1",
    main = "test.jg",
    srcs = glob(["*.jg", "js/*.jg"]),
    compiler = ":stage1",
)

jaguar_binary(
    name = "jbin",
    main = "test.jg",
    srcs = ["test.jg", "prelude.jg"],
    compiler = ":stage1",
)

exports_files(
    srcs = glob(["*.jg"]),
    visibility = ["//visibility:public"],
)
