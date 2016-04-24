# Jade Faist Portfolio Website

This codebase houses the code for [Jade Faist's Portfolio Website](https://www.jadefaist.com/).

# Table of Contents

* [Setup](#setup)
* [Frontend Tools](#frontend-tools)
  * [Precompilation](#gulp)


------


## Setup

`TODO`

# Frontend Tools

## Install NPM dependencies
`npm install`

## Gulp

Gulp will have been installed globally. You can initiate any gulp tasks from **the project root**. See `gulpfile.js` for everything possible, the most used task will be:

`$ gulp --dev`

1. flush-cache via n98.magerun
2. Starts livereload listener
3. build js in **uncompressed** development mode into design package and creates a source-map file
4. build css in **uncompressed** development mode into design package and creates a source-map file
5. copy and compress images into design package
6. watches the following files and runs flush-cache on changes

* ./public/app/design/frontend/**/*.xml
* ./public/app/design/**/locale/**/*.csv
* ./public/app/locale/**/*.csv
* ./public/app/etc/**/*.xml
* ./public/app/code/**/etc/*.xml

7. watches composer.lock and runs composer-install on changes
8. keep watching for changes until stopped (by ctrl+c)


### Environment flag

Appending `--dev` on any task will save any appropriate js and css files in **uncompressed** development mode as well as generate source-map files.


### Watch Tasks

`$ gulp` or `$ gulp --dev`: Default Magento build and watch described [above](#gulp).

`$ gulp watch-css` or `$ gulp watch-css --dev`: Watches just sass files and updates on css compilation.

`$ gulp styleguide` or `$ gulp styleguide --dev`: Watches both magento and styleguide source and builds styleguide css.

`$ gulp wordpress` or `$ gulp wordpress --dev`: Build and watch styles in wordpress theme folder.

`$ gulp all` or `$ gulp all --dev`: Build **All** the styles (Magento, Wordpress and styleguide).


### One Time Tasks

`$ gulp build` or `$ gulp build --dev`: Build all Magento (js, images, css) and styleguide css one time.

`$ gulp -v`: Output gulp versions (locally and globally)


### LiveReload

[Browser Extension for Chrome](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-)

### JavaScript

When *Gulp* is initiated or changes made when watching any js file saved in the `/public/source/frontend/yakima/default/js/` folder.

All js will be concatinated into a single file: `/public/skin/frontend/yakima/default/js/site-scripts.js`

### Sass

When *Gulp* is watching any Sass file saved in the `/public/source/frontend/yakima/default/sass/` folder.

All Sass will compile into two css files: `/public/skin/frontend/yakima/default/css/ie.css` and `/public/skin/frontend/yakima/default/css/styles.css`
