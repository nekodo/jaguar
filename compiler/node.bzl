def action_node_binary(ctx, main_attr, output, args=[]):
  main = main_attr.files.to_list()[0]

  runfiles = ctx.runfiles(
     files=[main],
     collect_default = True,
  )

  print(main.short_path)

  ctx.actions.write(
      output=output,
      content="""
      #!/bin/bash

      if [ -z "$RUNFILES_DIR" ]; then
        RUNFILES_DIR=$0.runfiles
      fi

      MAIN=$RUNFILES_DIR/jaguar/%s
      ARGS=%s
      echo "node --use_strict --harmony $MAIN $ARGS $@"
      node --use_strict --harmony $MAIN $ARGS $@
      """ % (
          main.short_path,
          " ".join(args),
      ),
      is_executable=True,
  )

  return runfiles

def _node_binary_impl(ctx):
  runfiles = action_node_binary(
    ctx, ctx.attr.main, ctx.outputs.executable)

  #print(runfiles.files)
  return [DefaultInfo(runfiles=runfiles)]

node_binary = rule(
    implementation=_node_binary_impl,
    attrs={
        "main": attr.label(allow_single_file=True),
    },
    executable = True,
)

node_test = rule(
    implementation=_node_binary_impl,
    attrs={
        "main": attr.label(allow_single_file=True),
    },
    test = True,
    executable = True,
)
