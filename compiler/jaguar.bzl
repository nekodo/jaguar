# Extensions!

CompilerInfo = provider()

def _library_impl(ctx):
  main = ctx.file.main
  srcs = ctx.files.srcs
  out = ctx.outputs.out
  bundle = ctx.attr.compiler[CompilerInfo].bundle
  builtins = ctx.attr.compiler[CompilerInfo].builtins
  node = ctx.executable._node
  js_wrapper = ctx.attr.compiler[CompilerInfo].js
  
  inputs = [main, builtins, js_wrapper] + srcs
  #print(compiler.default_runfiles.files)

  args = [js_wrapper.path, main.path, out.path]

  if bundle:
    #print("########## BUNDLE ###########")
    #print(bundle)
    #print(bundle.default_runfiles.files)
    #print(bundle.files)
    inputs += list(bundle.default_runfiles.files)
    inputs += list(bundle.files)
    #inputs += list(ctx.attr.compiler.default_runfiles.files)
    #inputs += list(compiler.default_runfiles.files)
    #inputs.append(compiler)
    args += [list(bundle.files)[0].path]
  else:
    args += ['foo']
  args += [builtins.path]
  #print(inputs)
  #print(args)
  #ctx.action(command="find . && ls -al .", outputs=[ctx.outputs.blah])
  ctx.action(
      inputs=inputs,
      outputs=[out],
      arguments=args,
      progress_message="Compiling %s" % main.short_path,
      executable=node,
  )
  runfiles = ctx.runfiles(files=[builtins])
  return [DefaultInfo(runfiles=runfiles)]

jaguar_library = rule(
    implementation=_library_impl,
    attrs={
        "main": attr.label(allow_single_file=True),
        "srcs": attr.label_list(allow_files=True),
        "compiler": attr.label(providers=[CompilerInfo]),
        "_node": attr.label(
            default = Label("@org_pubref_rules_node_toolchain//:node_tool"),
            single_file = True,
            allow_files = True,
            executable = True,
            cfg = "host",
        ),
    },
    outputs={
      "out": "%{name}.jg.js",
      #"blah": "%{name}blah.js",
    },
)

def _compiler_impl(ctx):
  runfiles = ctx.runfiles(files=[ctx.file.builtins])
  return [
    DefaultInfo(runfiles=runfiles),
    CompilerInfo(
        bundle = ctx.attr.jaguar,
        builtins = ctx.file.builtins,
        js = ctx.file.js_wrapper,
    ),
  ]

_jaguar_compiler = rule(
    implementation=_compiler_impl,
    attrs={
        "builtins": attr.label(allow_single_file=True),
        "jaguar": attr.label(allow_single_file=True),
        "js_wrapper": attr.label(allow_single_file=True),
    },
)

def jaguar_compiler(name, js_wrapper, jaguar_bundle,
                    builtins, visibility=None):
  
  _jaguar_compiler(
      name = name,
      js_wrapper = js_wrapper,
      jaguar = jaguar_bundle,
      builtins = builtins,
      visibility = visibility,
  )
