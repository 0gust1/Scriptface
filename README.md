# Scriptface

A desktop application providing a little scripting dashboard for your projects.

Drop a folder on the application windows, and it will expose you a simple interface over actionnable scripts

This tool can be used as :
* a sort of command-line helper for people not very tech-savvy
* a first layer of documentation for your projects

Features :
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

## How to use / install it :

This application uses node-webkit as a runtime.

3 possibilities :

* Grab a compiled, platform specific version, with node-webkit embedded.
* Download and install node-webkit, download the app archive (*.nw file), launch node-webkit with the app archive as parameter.
* Download and install node-webkit, clone this repository and launch node-webkit with the app directory as a parameter.

### prebuilt binaries :


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

