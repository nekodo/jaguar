def action_node_binary(ctx, main_attr, output, args=[]):
  main = list(main_attr.files)[0]
  
  runfiles = ctx.runfiles(files=[
     main,
  ]).merge(
      main_attr.default_runfiles,
  )

  ctx.file_action(
      output=output,
      content="""
      #!/bin/bash

      RUNFILES=$0.runfiles/__main__

      MAIN=$RUNFILES/%s
      ARGS=%s
      echo "node --use_strict --harmony $MAIN $ARGS $@"
      node --use_strict --harmony $MAIN $ARGS $@
      """ % (
          main.short_path,
          " ".join(args),
      ),
      executable=True,
  )
  
  return runfiles

def _node_binary_impl(ctx):
  runfiles = action_node_binary(
    ctx, ctx.attr.main, ctx.outputs.executable)
  
  return [DefaultInfo(runfiles=runfiles)]

node_binary = rule(
    implementation=_node_binary_impl,
    attrs={
        "main": attr.label(allow_single_file=True),
    },
    executable = True,
)
