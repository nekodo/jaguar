load("//compiler:jaguar.bzl", "jaguar_js_bundle")

def _module_diff_test_impl(ctx):
  expected = ctx.attr.expected
  actual = ctx.attr.actual

  runfiles = ctx.runfiles(files=[
      ctx.file.expected,
      ctx.file.actual,
      ctx.file._main,
  ]).merge(
      ctx.attr.expected.default_runfiles,
  ).merge(
      ctx.attr.actual.default_runfiles,
  )

  ctx.actions.write(
      output=ctx.outputs.executable,
      content="""
      #!/bin/bash

      MAIN=%s
      ACTUAL=%s
      EXPECTED=%s
      pwd
      node $MAIN $ACTUAL $EXPECTED
      """ % (
          ctx.file._main.short_path,
          ctx.file.actual.short_path,
          ctx.file.expected.short_path,
      ),
      is_executable=True
  )

  return [DefaultInfo(runfiles=runfiles)]

module_diff_test = rule(
    implementation = _module_diff_test_impl,
    attrs = {
        "expected": attr.label(allow_single_file=True),
        "actual": attr.label(allow_single_file=True),
        "_main": attr.label(
            default = Label("//compiler/e2e:run.js"),
            allow_single_file = True,
        ),
    },
    test = True,
)


def compiler_diff_test(name, expected, actual):
  jaguar_js_bundle(
      name = "%s_actual_stage1" % name,
      main = "test",
      srcs = [
        actual,
        "//compiler:prelude.jg",
        "//compiler:ast.jg",
        "//compiler:parsers.jg",
        "//compiler:jaguarLexer.jg",
        "//compiler:jaguarParser.jg",
        "//compiler:graph.jg",
      ],
      compiler = "//compiler:stage1",
  )

  module_diff_test(
      name = "%s_stage1" % name,
      actual = ":%s_actual_stage1" % name,
      expected = expected,
  )

  jaguar_js_bundle(
      name = "%s_actual_stage2" % name,
      main = "test",
      srcs = [
        actual,
        "//compiler:prelude.jg",
        "//compiler:ast.jg",
        "//compiler:parsers.jg",
        "//compiler:jaguarLexer.jg",
        "//compiler:jaguarParser.jg",
        "//compiler:graph.jg",
      ],
      compiler = "//compiler:stage2",
  )

  module_diff_test(
      name = "%s_stage2" % name,
      actual = ":%s_actual_stage2" % name,
      expected = expected,
  )

  jaguar_js_bundle(
      name = "%s_actual_opt" % name,
      main = "test",
      srcs = [
        actual,
        "//compiler:prelude.jg",
        "//compiler:ast.jg",
        "//compiler:parsers.jg",
        "//compiler:jaguarLexer.jg",
        "//compiler:jaguarParser.jg",
        "//compiler:graph.jg",
      ],
      compiler = "//compiler:stage2",
      compiler_args = ["--opt"],
  )

  module_diff_test(
      name = "%s_opt" % name,
      actual = ":%s_actual_opt" % name,
      expected = expected,
  )

  native.test_suite(
      name = name,
      tests = [
          "%s_stage1" % name,
          "%s_stage2" % name,
          "%s_opt" % name,
      ],
  )
