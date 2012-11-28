#MindMaps
The [MindMaps](https://github.com/drichard/mindmaps) project port into [Dojo Toolkit](http://dojotoolkit.org/) adding:

- well-maintainable modular JavaScript via [AMD](http://requirejs.org/docs/whyamd.html)
- emphasis on the separation of concerns principle
- class-based inheritance via [`dojo/_base/declare`](http://dojotoolkit.org/reference-guide/1.8/dojo/_base/declare.html)
- the UI governed by [Dijit](http://dojotoolkit.org/reference-guide/1.8/dijit/index.html)
- unit testing via [DOH](http://dojotoolkit.org/reference-guide/1.8/util/doh.html) (with some of my syntactic sugar)
- stylesheets via [LESS CSS preprocessor](http://lesscss.org/)
- [Google Closure Compiler](http://code.google.com/p/closure-compiler/)

The main motivation behind the project is the fact the Dojo world is missing a well-designed medium-sized single-page web application to learn from. I have been mastering Dojo Toolkit since version 0.3.1, i.e. since 2006, so I believe I can fill the void. Therefore the tutorial series is very likely to follow the first stable version of MindMaps.

## Versioning
[A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/) applies, therefore the latest version of the source code is located in `develop` branch. Thus reserving the `master` branch for numbered releases.

## Build
Run `build.sh` script, deploy the content of `dist` directory.

To make build process work via node.js on Windows (instead of Rhino) you need to apply [`node-win.patch`](http://bugs.dojotoolkit.org/ticket/15413):

    patch -p0 < node-win.patch

## Stylesheets
Build script `build.sh` compiles `less` sources to `css`:
    
    lessc *.less > *.css

It depends on `lessc`:

    npm install -g less

Currently I do not use client side `less` compilation in debug/development mode, because I compile on-the-fly via [SimpLESS](https://github.com/paratron/SimpLESS/).

## License
MindMaps is, like the original MindMaps, licensed under [AGPL V3](http://www.gnu.org/licenses/agpl-3.0.html).