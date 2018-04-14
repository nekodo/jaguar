# Extensions!
load("//compiler:node.bzl", "node_binary", "action_node_binary")

CompilerInfo = provider()
  

def _js_library_impl(ctx):
  main = ctx.file.main
  srcs = ctx.files.srcs
  out = ctx.outputs.out
  compiler = ctx.executable.compiler
  
  print("compiler builtins: " + ctx.attr.compiler[CompilerInfo].builtins.path + " for " + out.path)
  
  inputs = [main, compiler] + srcs + list(ctx.attr.compiler.default_runfiles.files)
  print("inputs: " + ", ".join(inputs))
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
            # Bit of a hack, we really mean "host" but Jaguar output is platform
            # agnostic at the moment and "target" avoids duplicate builds.
            cfg = "target",
            providers = [CompilerInfo],
        ),
        "builtins": attr.label(allow_single_file=True),
        "args": attr.string_list(),
    },
    outputs={
      "out": "%{name}.jg.js",
    },
)

def _cp_tag_impl(ctx):
  runfiles = ctx.runfiles(files=[
      ctx.file.builtins,
  ]).merge(
      ctx.attr.binary.default_runfiles,
  )

  ctx.action(
      inputs=[ctx.file.binary],
      outputs=[ctx.outputs.executable],
      command="cp $1 $2",
      arguments=[ctx.file.binary.path, ctx.outputs.executable.path]
  )
  return [DefaultInfo(runfiles=runfiles), CompilerInfo(builtins=ctx.file.builtins)]

cp_tag = rule(
    implementation=_cp_tag_impl,
    attrs={
        "builtins": attr.label(allow_single_file=True),
        "binary": attr.label(
            single_file = True,
            allow_files = True,
            executable = True,
            cfg = "host",
        ),
    },
    executable = True,
)

def jaguar_binary(name, main, srcs, compiler="//compiler/bin:latest", args=[]):
    jaguar_js_library(
        name = name + "_lib",
        main = main,
        srcs = srcs,
        compiler = compiler,
    )
    
    node_binary(
        name = name,
        main = ":" + name + "_lib",
        args = args,
    )

def _jaguar_compiler(name, builtins, jaguar):
    node_binary(
        name = name + "_bin",
        main = jaguar,
        args = ["--builtins="],
    )

def _compiler_impl(ctx):
  print(ctx.file.jaguar.path)
  binary_runfiles = action_node_binary(
    ctx, ctx.attr.jaguar, ctx.outputs.executable, ["--builtins=%s" % (ctx.file.builtins.path)])
  
  runfiles = ctx.runfiles(files=[
      ctx.file.builtins,
  ]).merge(
      binary_runfiles,
  )

  return [DefaultInfo(runfiles=runfiles), CompilerInfo(builtins=ctx.file.builtins)]



jaguar_compiler = rule(
    implementation=_compiler_impl,
    attrs={
        "builtins": attr.label(allow_single_file=True),
        "jaguar": attr.label(allow_single_file=True),
    },
    executable = True,
)
