load("//compiler:jaguar.bzl", "jaguar_library")

def _module_diff_test_impl(ctx):
  expected = ctx.attr.expected
  actual = ctx.attr.actual
  node = ctx.executable._node
  
  runfiles = ctx.runfiles(files=[
      ctx.file.expected,
      ctx.file.actual,
      node,
      ctx.file._main,
  ]).merge(
      ctx.attr.expected.default_runfiles,
  ).merge(
      ctx.attr.actual.default_runfiles,
  ).merge(
      ctx.attr._node.default_runfiles,
  )
  
  ctx.file_action(
      output=ctx.outputs.executable,
      content="""
      #!/bin/bash
      
      NODE=%s
      MAIN=%s
      ACTUAL=%s
      EXPECTED=%s
      echo $MAIN $NODE $ACTUAL $EXPECTED
      pwd
      $NODE $MAIN $ACTUAL $EXPECTED
      """ % (
          node.path,
          ctx.file._main.short_path,
          ctx.file.actual.short_path,
          ctx.file.expected.short_path,
      ),
      executable=True
  )
  
  return [DefaultInfo(runfiles=runfiles)]

module_diff_test = rule(
    implementation = _module_diff_test_impl,
    attrs = {
        "expected": attr.label(allow_single_file=True),
        "actual": attr.label(allow_single_file=True),
        "_main": attr.label(
            default = Label("//compiler/e2e:run.js"),
            single_file = True,
            allow_files = True,
        ),
        "_node": attr.label(
            default = Label("@org_pubref_rules_node_toolchain//:node_tool"),
            single_file = True,
            allow_files = True,
            executable = True,
            cfg = "host",
        ),
    },
    test = True,
)


def compiler_diff_test(name, expected, actual):
  jaguar_library(
      name = "%s_actual_stage1" % name,
      main = actual,
      compiler = "//compiler:stage1",
  )
  
  module_diff_test(
      name = "%s_stage1" % name,
      actual = ":%s_actual_stage1" % name,
      expected = expected,
  )
  
  jaguar_library(
      name = "%s_actual_stage2" % name,
      main = actual,
      compiler = "//compiler:stage2",
  )
  
  module_diff_test(
      name = "%s_stage2" % name,
      actual = ":%s_actual_stage2" % name,
      expected = expected,
  )
  
  native.test_suite(
      name = name,
      tests = [
          "%s_stage1" % name,
          "%s_stage2" % name,
      ],
  )
