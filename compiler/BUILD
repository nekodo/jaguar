load("//compiler:jaguar.bzl", "jaguar_js_bundle", "jaguar_binary", "jaguar_test")

exports_files(["builtins.js"])

SRCS = glob(["*.jg", "js/*.jg"], exclude = ["*_test.jg"])

jaguar_binary(
    name = "stage1",
    main = "compiler/compiler.jg",
    srcs = SRCS,
    visibility = ["//visibility:public"],
)

jaguar_binary(
    name = "stage2",
    main = "//compiler/compiler.jg",
    srcs = SRCS,
    compiler = ":stage1",
    visibility = ["//visibility:public"],
)

jaguar_binary(
    name = "opt",
    main = "//compiler/compiler.jg",
    srcs = SRCS,
    compiler = ":stage2",
    compiler_args = ["--opt"],
    visibility = ["//visibility:public"],
)

jaguar_js_bundle(
    name = "opt_opt_lib",
    main = "//compiler/compiler.jg",
    srcs = SRCS,
    compiler = ":opt",
    compiler_args = ["--opt"],
)

exports_files(
    srcs = glob(["*.jg"]),
    visibility = ["//visibility:public"],
)

TESTS = [
    "test/basicop_test.jg",
    "typer_test.jg",
]

jaguar_test(
  name = "basicop_test",
  main = "//compiler/test/basicop_test.jg",
  srcs = ["test/test.jg", "test/basicop_test.jg", "prelude.jg"],
  compiler = ":stage2",
)

jaguar_test(
  name = "typer_test",
  main = "//compiler/typer_test.jg",
  srcs = ["test/test.jg", "typer_test.jg"] + SRCS,
  compiler = ":stage2",
)

jaguar_test(
  name = "newtyper_test",
  main = "//compiler/newtyper_test.jg",
  srcs = ["test/test.jg", "newtyper_test.jg"] + SRCS,
  compiler = ":stage2",
)

jaguar_test(
  name = "typechecker_test",
  main = "//compiler/typechecker_test.jg",
  srcs = ["test/test.jg", "typechecker_test.jg"] + SRCS,
  compiler = ":stage2",
)

jaguar_test(
  name = "typeutil_test",
  main = "//compiler/typeutil_test.jg",
  srcs = ["test/test.jg", "typeutil_test.jg", "prelude.jg", "ast.jg", "typeutil.jg", "result.jg", "ctx.jg", "printer.jg"],
  compiler = ":stage2",
)
