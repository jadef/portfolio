# Jade Faist Portfolio Website

This codebase houses the code for [Jade Faist's Portfolio Website](https://www.jadefaist.com/).

# Table of Contents

* [Setup](#setup)
  * [Install NPM dependencies](#install-npm-dependencies)
* [Precompilation](#precompilation)
  * [Gulp](#gulp---local)
  * [Mustache](#mustache)
  * [Browsersync](#browsersync)
  * [JavaScript](#javascript)
  * [Sass](#sass)
* [Deployment](#deployment)


------


## Setup

Gulp includes browser-sync. So just follow the following section to run Gulp and it will be opened in your default browser at `http://localhost:5050/`

### Install NPM dependencies

`npm install` to get all necessary tooling.

# Precompilation

## Gulp - local

Gulp will have been installed locally. Which  an be triggered via npm scripts. Those can be ran by entering:

`npm start` - build and watch for development

1. build js in **uncompressed** development mode into design package and creates a source-map file
2. copy and compress images into design package
3. build css in **uncompressed** development mode into design package and creates a source-map file
4. watches the following folders

* source/scripts
* source/images
* source/sass

6. keep watching for changes until stopped (by ctrl+c)

---

`npm run build`

**Cleans** the existing public folders and builds all the (js, images, css) one time.

## Gulp - Global

If you have gulp installed globally, you can initiate any gulp tasks from **the project root**. See `gulpfile.js` for everything possible, the most used task will still be:

`gulp` or `gulp compile --prod`

## Mustache

`TODO`

### BrowserSync

`TODO`

## JavaScript

When *Gulp* is initiated or changes made when watching any js file saved in the `source/scripts/` folder.

All js will be concatinated into a single file: `public/scripts.js`

## Sass

When *Gulp* is watching any Sass file saved in the `source/sass/` folder.

All Sass will compile into a single css file: `/public/main.css`

# Deployment

use the bash script to automatically package and deploy the public folder (requires SSH auth set up):

`bash ./utils/deploy.sh`
