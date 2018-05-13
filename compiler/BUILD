load("//compiler:jaguar.bzl", "jaguar_js_bundle", "jaguar_binary")

exports_files(["builtins.js"])

jaguar_binary(
    name = "stage1",
    main = "compiler/compiler.jg",
    srcs = glob(["*.jg", "js/*.jg"]),
    visibility = ["//visibility:public"],
)

jaguar_binary(
    name = "stage2",
    main = "//compiler/compiler.jg",
    srcs = glob(["*.jg", "js/*.jg"]),
    compiler = ":stage1",
    visibility = ["//visibility:public"],
)

jaguar_binary(
    name = "opt",
    main = "//compiler/compiler.jg",
    srcs = glob(["*.jg", "js/*.jg"]),
    compiler = ":stage2",
    compiler_args = ["--opt"],
    visibility = ["//visibility:public"],
)

jaguar_js_bundle(
    name = "opt_opt_lib",
    main = "//compiler/compiler.jg",
    srcs = glob(["*.jg", "js/*.jg"]),
    compiler = ":opt",
    compiler_args = ["--opt"],
)

exports_files(
    srcs = glob(["*.jg"]),
    visibility = ["//visibility:public"],
)
