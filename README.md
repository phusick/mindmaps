#MindMaps
The [MindMaps](https://github.com/drichard/mindmaps) project rewritten to Dojo Toolkit employing:

- modular JavaScript via [AMD](http://requirejs.org/docs/whyamd.html)
- stylesheets via [less](http://lesscss.org/)
- [Google Closure Compiler](http://code.google.com/p/closure-compiler/)

## Build
Run `build.sh` script, deploy the content of `dist` directory.

To make build process work via node.js on Windows (instead of Rhino) you need to apply [`node-win.patch`](http://bugs.dojotoolkit.org/ticket/15413):

    patch -p0 < node-win.patch

## Stylesheets via less
Build script `build.sh` compiles `less` sources to `css`:
    
    lessc *.less > *.css

It depends on `lessc`, intall it via:

    npm install -g less

Currently I do not use client side `less` compilation in debug/development mode, because I compile on-the-fly via [SimpLESS](http://wearekiss.com/simpless)([GitHub](https://github.com/paratron/SimpLESS/)).