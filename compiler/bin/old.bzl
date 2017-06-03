load("//compiler:jaguar.bzl", "CompilerInfo")

def _old_compiler_impl(ctx):
  node = ctx.executable._node
  
  runfiles = ctx.runfiles(files=[
      ctx.file.js_wrapper,
      ctx.file.jaguar,
      node,
      ctx.file.builtins,
  ]).merge(
      ctx.attr.js_wrapper.default_runfiles,
  ).merge(
      ctx.attr.jaguar.default_runfiles,
  ).merge(
      ctx.attr.builtins.default_runfiles,
  ).merge(
      ctx.attr._node.default_runfiles,
  )
  
  ctx.file_action(
      output=ctx.outputs.executable,
      content="""
      #!/bin/bash
      
      NODE=%s
      JS_MAIN=%s
      FILE=$2
      OUT=$1
      JG_MAIN=%s
      BUILTINS=%s
      pwd
      echo $NODE $JS_MAIN $FILE $OUT $JG_MAIN $BUILTINS
      $NODE $JS_MAIN $FILE $OUT $JG_MAIN $BUILTINS
      """ % (
          node.path,
          ctx.file.js_wrapper.path,
          ctx.file.jaguar.path,
          ctx.file.builtins.path,
      ),
      executable=True,
  )
  
  return [DefaultInfo(runfiles=runfiles), CompilerInfo(builtins=ctx.file.builtins)]

old_jaguar_compiler = rule(
    implementation=_old_compiler_impl,
    attrs={
        "builtins": attr.label(allow_single_file=True),
        "jaguar": attr.label(allow_single_file=True),
        "js_wrapper": attr.label(allow_single_file=True),
        "_node": attr.label(
            default = Label("@org_pubref_rules_node_toolchain//:node_tool"),
            single_file = True,
            allow_files = True,
            executable = True,
            cfg = "host",
        ),
    },
    executable = True,
)

def _compiler_impl13(ctx):
  node = ctx.executable._node
  
  runfiles = ctx.runfiles(files=[
      ctx.file.js_wrapper,
      ctx.file.jaguar,
      node,
      ctx.file.builtins,
  ]).merge(
      ctx.attr.js_wrapper.default_runfiles,
  ).merge(
      ctx.attr.jaguar.default_runfiles,
  ).merge(
      ctx.attr.builtins.default_runfiles,
  ).merge(
      ctx.attr._node.default_runfiles,
  )
  
  ctx.file_action(
      output=ctx.outputs.executable,
      content="""
      #!/bin/bash
      
      NODE=%s
      JS_MAIN=%s
      JG_MAIN=%s
      BUILTINS=%s
      echo $NODE $JS_MAIN $JG_MAIN $BUILTINS $@
      $NODE $JS_MAIN $JG_MAIN $BUILTINS $@
      """ % (
          node.path,
          ctx.file.js_wrapper.path,
          ctx.file.jaguar.path,
          ctx.file.builtins.path,
      ),
      executable=True,
  )
  
  return [DefaultInfo(runfiles=runfiles), CompilerInfo(builtins=ctx.file.builtins)]

old_jaguar_compiler13 = rule(
    implementation=_compiler_impl13,
    attrs={
        "builtins": attr.label(allow_single_file=True),
        "jaguar": attr.label(allow_single_file=True),
        "js_wrapper": attr.label(allow_single_file=True),
        "_node": attr.label(
            default = Label("@org_pubref_rules_node_toolchain//:node_tool"),
            single_file = True,
            allow_files = True,
            executable = True,
            cfg = "host",
        ),
    },
    executable = True,
)

def _compiler_impl0_14(ctx):
  node = ctx.executable._node
  
  runfiles = ctx.runfiles(files=[
      ctx.file.jaguar,
      node,
      ctx.file.builtins,
  ]).merge(
      ctx.attr.jaguar.default_runfiles,
  ).merge(
      ctx.attr.builtins.default_runfiles,
  ).merge(
      ctx.attr._node.default_runfiles,
  )
  
  ctx.file_action(
      output=ctx.outputs.executable,
      content="""
      #!/bin/bash
      
      NODE=%s
      JG_MAIN=%s
      BUILTINS=%s
      pwd
      $NODE $JG_MAIN $BUILTINS $@
      """ % (
          node.path,
          ctx.file.jaguar.path,
          ctx.file.builtins.path,
      ),
      executable=True,
  )
  
  return [DefaultInfo(runfiles=runfiles), CompilerInfo(builtins=ctx.file.builtins)]

jaguar_compiler0_14 = rule(
    implementation=_compiler_impl0_14,
    attrs={
        "builtins": attr.label(allow_single_file=True),
        "jaguar": attr.label(allow_single_file=True),
        "_node": attr.label(
            default = Label("@org_pubref_rules_node_toolchain//:node_tool"),
            single_file = True,
            allow_files = True,
            executable = True,
            cfg = "host",
        ),
    },
    executable = True,
)

def _compiler_impl0_15(ctx):
  node = ctx.executable._node
  
  runfiles = ctx.runfiles(files=[
      ctx.file.jaguar,
      node,
      ctx.file.builtins,
  ]).merge(
      ctx.attr.jaguar.default_runfiles,
  ).merge(
      ctx.attr.builtins.default_runfiles,
  ).merge(
      ctx.attr._node.default_runfiles,
  )
  
  ctx.file_action(
      output=ctx.outputs.executable,
      content="""
      #!/bin/bash
      
      NODE=%s
      JG_MAIN=%s
      BUILTINS=%s
      pwd
      $NODE $JG_MAIN --builtins=$BUILTINS $@
      """ % (
          node.path,
          ctx.file.jaguar.path,
          ctx.file.builtins.path,
      ),
      executable=True,
  )
  
  return [DefaultInfo(runfiles=runfiles), CompilerInfo(builtins=ctx.file.builtins)]

jaguar_compiler0_15 = rule(
    implementation=_compiler_impl0_15,
    attrs={
        "builtins": attr.label(allow_single_file=True),
        "jaguar": attr.label(allow_single_file=True),
        "_node": attr.label(
            default = Label("@org_pubref_rules_node_toolchain//:node_tool"),
            single_file = True,
            allow_files = True,
            executable = True,
            cfg = "host",
        ),
    },
    executable = True,
)
