def action_node_binary(ctx, node_attr, main_attr, output, args=[]):
  node = list(node_attr.files)[0]
  main = list(main_attr.files)[0]
  
  runfiles = ctx.runfiles(files=[
     main,
     node,
  ]).merge(
      main_attr.default_runfiles,
  ).merge(
      node_attr.default_runfiles,
  )

  ctx.file_action(
      output=output,
      content="""
      #!/bin/bash
      
      NODE=%s
      MAIN=%s
      ARGS=%s
      echo "$NODE --use_strict --harmony $MAIN $ARGS $@"
      $NODE --use_strict --harmony $MAIN $ARGS $@
      """ % (
          node.short_path,
          main.short_path,
          " ".join(args),
      ),
      executable=True,
  )
  
  return runfiles

def _node_binary_impl(ctx):
  runfiles = action_node_binary(
    ctx, ctx.attr._node, ctx.attr.main, ctx.outputs.executable)
  
  return [DefaultInfo(runfiles=runfiles)]

node_binary = rule(
    implementation=_node_binary_impl,
    attrs={
        "main": attr.label(allow_single_file=True),
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
