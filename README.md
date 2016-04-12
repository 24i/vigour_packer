# Packer
Prepares packages of build assets to be served to specific device platforms.
This tool fits in a specific methodology of producing and shipping app code.

## Read first
Read this doc about vigourously writing and shipping app code:
https://github.com/vigour-io/processes-and-culture/blob/master/shipping/packages.md

## Input

### Consists of

1. pointer to build assets (source files)
2. custom files and modifications to existing files
3. pointer to output location

### Is provided by
In overruling order (1 overruled by 2 etc):

1. `Platform plugin` (e.g. ChromeCast)
2. Settings in package.json (specific to selected Platform)
3. Command line arguments

Which `Platform plugin` should be used has to be indicated with a command line argument.

## Basic packaging

The basic package contains the following:
1. Symlinks to `build.js`, `build.css` and `assets` directory from a certain build (e.g. TV or main).
2. an `index.html` that points to `build.js` and `build.css`

## Platform plugins

Any other files that should be included (e.g. `webos.js` on webos) should be included through a platform specific plugin module that should be part of the project dependencies.

### Customizing platform plugin files

The packer settings for a project should be able to customize files coming from a `platform plugin`. For example: using the settings in the `package.json` of my project (and possibly providing an alternative file) I should be able to modify or overwrite the `receiver.js` file included in the ChromeCast package by the ChomeCast packer plugin.
