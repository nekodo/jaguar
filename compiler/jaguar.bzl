# Extensions!

CompilerInfo = provider()

def _js_library_impl(ctx):
  main = ctx.file.main
  srcs = ctx.files.srcs
  out = ctx.outputs.out
  compiler = ctx.executable.compiler
  
  inputs = [main, compiler] + srcs + list(ctx.attr.compiler.default_runfiles.files)
  args = (["--out=" + out.path, "--main=" + main.path] +
          [src.path for src in srcs] +
          ctx.attr.args)

  ctx.action(
      inputs=inputs,
      outputs=[out],
      arguments=args,
      progress_message="Compiling %s" % main.short_path,
      executable=compiler,
  )
  runfiles = ctx.runfiles(files=[ctx.attr.compiler[CompilerInfo].builtins])
  return [DefaultInfo(runfiles=runfiles)]

jaguar_js_library = rule(
    implementation=_js_library_impl,
    attrs={
        "main": attr.label(allow_single_file=True),
        "srcs": attr.label_list(allow_files=True),
        "compiler": attr.label(
            single_file = True,
            allow_files = True,
            executable = True,
            cfg = "host",
            providers = [CompilerInfo],
        ),
        "args": attr.string_list(),
    },
    outputs={
      "out": "%{name}.jg.js",
    },
)

def _compiler_impl(ctx):
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
      $NODE --use_strict --harmony $JG_MAIN --builtins=$BUILTINS $@
      """ % (
          node.path,
          ctx.file.jaguar.path,
          ctx.file.builtins.path,
      ),
      executable=True,
  )
  
  return [DefaultInfo(runfiles=runfiles), CompilerInfo(builtins=ctx.file.builtins)]

jaguar_compiler = rule(
    implementation=_compiler_impl,
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
