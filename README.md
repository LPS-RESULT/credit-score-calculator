# README

This is an application template. It is a summary of about 5 years of
building web applications, and this app template demonstrates particularly, a full blown production-ready `AngularJS` app.

The term `app` is used to substitute the name of the application.

## Directory

The whole directory structure is meant to be bootstrapped directly to a "web" directory. A proxy server, `server.js` is available
to run and serve the frontend app

The main folder contains all the whole frontend source files and is divided into subdirectories.

### Assets

The Assets folder contains all media files and json files that are required by the app to serve an aesthetic purpose.
Fonts are stored in the `fonts` folder. Images are stored in the `img` folder. Locales containing language mapping (for internationalization) are stored in
the `locales` folder. 

### Build

The Build folder is a temporary folder used by the app during the build process. Files here should be ignored.

### Dist

The Distribution folder is where the build process stores the final output version of the app that is production ready.
The proxy `server.js` simulates the production environment by serving the app through a separate `/prod` path.

### HTML

The HTML folder contains all html files. It would only contain html files since this configuration is taken advantage
by the build process. Html templates are automatically combined into js template files using `grunt-angular-templates` 
and packed to be cached by `$templateCache`

### JS

The JS folder contains all JavaScript files. Since we are using `AngularJS`, the angular modules make up the
directories. Each module directory is further divided into directories for their purpose - Since controllers are based
on features and UI (or widgets) they are further divided by their parts, while services and other AngularJS components
can be left undivided (by UI) since they are singletons.

### Style

The Style folder contains all style-related files, particularly css. It was separated with assets because it is possible
that you may want to use a compiler, like sass to generate css files.

### Server

The Server folder contains all necessary scripts to run the app server. 

## App Setup

First off install the app basic dependencies by:

    npm install
    
Then install grunt-cli

    npm install -g grunt-cli

And also karma (for testing)

    npm install -g karma-cli

### Building using Grunt

Most of the needed packages for grunt are already defined in `package.json`

To run grunt, simply execute the following where `Gruntfile.js` is found

    grunt

Or you may specify a command, simply refer to the Gruntfile. e.g.

    grunt karma

### Development using dev.html

Development and Production modes are clearly separated. Dev mode allows you to work separately on the scripts and
templates, and find the problems in debug mode (since the files are not yet minified)

You may run the proxy `server.js` via

    node server.js
    
and open in the browser `http://localhost:8080/dev`

### Production using prod.html

In Production mode, always refer to `loader.js` and `Gruntfile.js` to see if all necessary files have been set. Unlike
dev, the production mode needs extra care and test because files here are minified so it would be really difficult to
debug at this stage. In this phase, it would be best to execute profiling processes and benchmarking tests, because
this is the fastest "form" in which your app will ever be.

Similar to dev, may run the proxy `server.js` via

    node server.js
    
and open in the browser `http://localhost:8080/prod`

### Running tests

To run tests, simply invoke:

    npm test
    
This is a shortcut to using mocha:

    mocha tests/**/*.js --reporter spec --timeout 30000

### Running the App

When `server.js` is run, it will automatically open in the browser the addresses: `http://localhost:8080/prod/#/` the production environment
and `http://localhost:8080/dev/#/` the development environment. 

Take note that production environment uses the `/dist` folder and has extra features like concat and minify,
 which are handled during the build process. It also uses fallback library to load the scripts thru `xhr` 
 (not thru `<script>`) for improved network latency

_Last Updated: 2/13/2019, ixi_
