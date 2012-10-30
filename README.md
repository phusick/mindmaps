#MindMaps
The [MindMaps](https://github.com/drichard/mindmaps) project rewritten to Dojo Toolkit employing:

- modular JavaScript via [AMD](http://requirejs.org/docs/whyamd.html)
- stylesheets via [less](http://lesscss.org/)
- [Google Closure Compiler](http://code.google.com/p/closure-compiler/)

## Build
Run `build.sh` script, deploy the content of `dist` directory.

To make build process work via node.js on Windows you need to apply [`node-win.patch`](http://bugs.dojotoolkit.org/ticket/15413):

    patch -p0 < node-win.patch

