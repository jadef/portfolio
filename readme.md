# Jade Faist Portfolio Website

This codebase houses the code for [Jade Faist's Portfolio Website](https://www.jadefaist.com/).

# Table of Contents

* [Setup](#setup)
* [Frontend Tools](#frontend-tools)
  * [Precompilation](#gulp)


------


## Setup
<!--
`TODO`

Super simple solution:

* `cd public`
* `python -m SimpleHTTPServer 3050` (or whatever port you want)
* In browser go to: localhost:3050 -->

Gulp now includes browser-sync. So just follow the following section to run Gulp and it will be opened in your default browser at `http://localhost:5050/`

# Frontend Tools

## Install NPM dependencies
`npm install`

## Gulp

Gulp will have been installed globally. You can initiate any gulp tasks from **the project root**. See `gulpfile.js` for everything possible, the most used task will be:

`$ gulp --dev`

1. build js in **uncompressed** development mode into design package and creates a source-map file
2. copy and compress images into design package
3. build css in **uncompressed** development mode into design package and creates a source-map file
4. watches the following folders

* source/scripts
* source/images
* source/sass

6. keep watching for changes until stopped (by ctrl+c)


### Environment flag

Appending `--dev` on any task will save any appropriate js and css files in **uncompressed** development mode as well as generate source-map files.


### Watch Tasks

`$ gulp` or `$ gulp --dev`: Default build and watch described [above](#gulp).


### One Time Tasks

`$ gulp compile`: **Cleans** the existing public folders and builds all the (js, images, css) one time.

`$ gulp build` or `$ gulp build --dev`: Build all (js, images, css) one time.

`$ gulp -v`: Output gulp versions (locally and globally)

### Mustache

`TODO`

### BrowserSync

`TODO`

### JavaScript

When *Gulp* is initiated or changes made when watching any js file saved in the `source/scripts/` folder.

All js will be concatinated into a single file: `public/scripts.js`

### Sass

When *Gulp* is watching any Sass file saved in the `source/sass/` folder.

All Sass will compile into a single css file: `/public/main.css`
