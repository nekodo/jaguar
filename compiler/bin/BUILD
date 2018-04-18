# Compiled compiler releases.

load("//compiler:node.bzl", "node_binary")

alias(
    name = "latest",
    actual = ":v0.34",
    visibility = ["//visibility:public"],
)

node_binary(
    name = "v0.33",
    main = "c0.33.jg.js",
)

node_binary(
    name = "v0.34",
    main = "c0.34.jg.js",
)
