# Extensions!
load("//compiler:node.bzl", "node_binary")
  
def jaguar_js_bundle(name, main, srcs,
    	             compiler = None, builtins = None,
		     compiler_args = None, visibility = None):
    compiler_args = compiler_args or []
    compiler = compiler or "//compiler/bin:latest"
    builtins = builtins or "//compiler:builtins.js"

    out = "%s.jg.js" % name
    args = [
    	 "--builtins=$(location %s)" % builtins,
	 "--out=$(location %s)" % out,
	 "--main=$(location %s)" % main,
    ] + ["$(location %s)" % src for src in srcs] + compiler_args

    native.genrule(
	name = name,
	srcs = [builtins] + srcs,
	outs = [out],
	cmd = "$(location %s) %s" % (compiler, " ".join(args)),
	tools = [compiler],
	visbility = visibility,
    )

def jaguar_binary(name, main, srcs,
                  compiler = None, builtins = None, compiler_args = None,
                  args = None, visibility = None):
    args = args or []

    jaguar_js_bundle(
        name = name + "_js",
        main = main,
        srcs = srcs,
        compiler = compiler,
	builtins = builtins,
	compiler_args = compiler_args,
    )
    
    node_binary(
        name = name,
        main = ":" + name + "_js",
        args = args,
	visibility = visibility,
    )
