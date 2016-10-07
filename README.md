# gulpfile.js

An example of a gulpfile used to build js-driven web applications (particularly angular).

Tasks:
- copy-html-files:
    Copies all the html files from 'views' folder to 'dist/views'
- css-files:
    Concatenate, minify and move all files inside wiredep comments from 'index.html' file to 'dist.styles'
- bower-files:
    Concatenate, uglify and ngAnnotate custom .js files and bower dependencies from wiredep comments inside the 'index.html'       file (suggest using 'vendor.js' as target file for dependencies and 'main.js' for custom .js
- image, font:
    Just copy-paste images and fonts
- initilaize:
    Reformat 'index.html' for production
    
Run gulp dev for a faster and lighter version (no minification, turns on a watcher)
Run gulp prod for a production ready (full minification, no watcher)
