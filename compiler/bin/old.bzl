load("//compiler:jaguar.bzl", "CompilerInfo")

def _old_compiler_impl(ctx):
  runfiles = ctx.runfiles(files=[
      ctx.file.js_wrapper,
      ctx.file.jaguar,
      ctx.file.builtins,
  ]).merge(
      ctx.attr.js_wrapper.default_runfiles,
  ).merge(
      ctx.attr.jaguar.default_runfiles,
  ).merge(
      ctx.attr.builtins.default_runfiles,
  )
  
  ctx.file_action(
      output=ctx.outputs.executable,
      content="""
      #!/bin/bash
      
      JS_MAIN=%s
      FILE=$2
      OUT=$1
      JG_MAIN=%s
      BUILTINS=%s
      pwd
      echo node $JS_MAIN $FILE $OUT $JG_MAIN $BUILTINS
      node $JS_MAIN $FILE $OUT $JG_MAIN $BUILTINS
      """ % (
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
    },
    executable = True,
)

def _compiler_impl13(ctx):  
  runfiles = ctx.runfiles(files=[
      ctx.file.js_wrapper,
      ctx.file.jaguar,
      ctx.file.builtins,
  ]).merge(
      ctx.attr.js_wrapper.default_runfiles,
  ).merge(
      ctx.attr.jaguar.default_runfiles,
  ).merge(
      ctx.attr.builtins.default_runfiles,
  )
  
  ctx.file_action(
      output=ctx.outputs.executable,
      content="""
      #!/bin/bash
      
      JS_MAIN=%s
      JG_MAIN=%s
      BUILTINS=%s
      echo node $JS_MAIN $JG_MAIN $BUILTINS $@
      node $JS_MAIN $JG_MAIN $BUILTINS $@
      """ % (
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
    },
    executable = True,
)

def _compiler_impl0_14(ctx):
  runfiles = ctx.runfiles(files=[
      ctx.file.jaguar,
      ctx.file.builtins,
  ]).merge(
      ctx.attr.jaguar.default_runfiles,
  ).merge(
      ctx.attr.builtins.default_runfiles,
  )
  
  ctx.file_action(
      output=ctx.outputs.executable,
      content="""
      #!/bin/bash
      
      JG_MAIN=%s
      BUILTINS=%s
      pwd
      node $JG_MAIN $BUILTINS $@
      """ % (
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
    },
    executable = True,
)

def _compiler_impl0_15(ctx):
  runfiles = ctx.runfiles(files=[
      ctx.file.jaguar,
      ctx.file.builtins,
  ]).merge(
      ctx.attr.jaguar.default_runfiles,
  ).merge(
      ctx.attr.builtins.default_runfiles,
  )
  
  ctx.file_action(
      output=ctx.outputs.executable,
      content="""
      #!/bin/bash
      
      JG_MAIN=%s
      BUILTINS=%s
      ls compiler
      CMD="node $JG_MAIN --builtins=$BUILTINS $@"
      echo $CMD
      $CMD
      """ % (
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
    },
    executable = True,
)
