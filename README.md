# Scriptface

Prototype of the next iteration :

http://codepen.io/anon/pen/ZYQKZX

![scriptface screenshot](https://github.com/0gust1/Scriptface/raw/master/scriptface_screenshot.png "scriptface screenshot")


A desktop application providing a little dashboard for your project's scripts.

Drop a folder on the application windows, and it will expose you a simple interface over actionnable scripts

This tool can be used as :
* a sort of command-line helper
* a first layer of documentation for your projects

**Features :**
* Allow project-based task definition (persisted in `command.json` file, in your project root).
* parses and expose package.json tasks
* parses and expose grunt tasks
* parses and expose gulp tasks (TODO)
* parses and expose Makefile contents (TODO)
* ... etc. TODO

**Tools used :**

- node-webkit yeoman generator
- node-webkit
- AngularJS

## Install it :

This application uses node-webkit as a runtime.

3 possibilities :

* Grab a compiled, platform specific version, with node-webkit embedded (see pre-built binaries below).
* Download and install node-webkit, download the app archive (*.nw file), launch node-webkit with the app archive as parameter (not yet).
* Download and install node-webkit, setup a build environnement (see below, "Build and run your own version").

### prebuilt binaries :

You're a foolish alpha-tester, okay :

https://www.dropbox.com/sh/vehbwf22hy6upqs/AAAvZJzOsyDwbMfbU46StMwMa

Be warned, it's still rude (but it seems to do the job).

## How to customise, play with it

### Build and run your own version :

**Build environnement :**

* install the yeoman generator `generator-node-webkit`
* Run it on a folder

**Project :**

* clone this project in `your_node-webkit_folder/app/`
* do `npm install` and `bower install`in the folder

**Launching :**
Basically `node-webkit_executable_path "your_app_folder"` :

`/Applications/node-webkit.app/Contents/MacOS/node-webkit  "/your_folder_path/app/"`

### Extend the capabilities :

Project tasks are "discovered" trough finding some common files (package.json, Gruntfile.js, gulpfile.js etc..).

You can easily add your own "discoverer" by extending the project loader with your own function returning a tasklist object.


## How to contribute ?

You found that app useful, you want to add some features ?

TODO

## TODOs :

* Handling data in services classes
* Checking theses good practices. https://gist.github.com/domenic/2790533
* Tests
* Optimize angular release build.
* Localization

## Links and references

* node-webkit : https://github.com/rogerwang/node-webkit
* node-webkit wiki : https://github.com/rogerwang/node-webkit/wiki
* node-webkit yeoman generator : https://www.npmjs.org/package/generator-node-webkit

* some useful posts about node-webkit : https://ehret.me

