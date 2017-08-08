ISS Tracker
=======

### Introduction

This repo builds an AngularJS app, which tracks the realtime location of the International Space Station (ISS), based on the public API. It also lists who is currently aboard the ISS.

A live version can be found at: [http://iss.joranquinten.nl/](http://iss.joranquinten.nl/)

### Installation

[NodeJS](https://nodejs.org/) and [GulpJS](http://gulpjs.com/) ([installation](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)) are required to develop and/or build this project. (Tested on node v4.4.7 ang Gulp v3.9.0)

After installing both packages, install the required components by running the following command in the Command Line Interface (CLI) from the project folder:

  install yarn & bower: npm install yarn -g

    yarn install && bower install

After installation, run the following command to ensure correct setup:

    gulp

This should display a list of available commands. The primary commands are:

    gulp dev

and

    gulp build

The dev-task is used during development and does not optimize the assets/code. It has browser-sync enabeld. The build optimizes the code and runs a code analysis tool ([plato](https://github.com/es-analysis/plato)) on each build in order to give a basic report (./reports/plato/) on the state and complexity of the source code.

---

### About

Author: [Joran Quinten](mailto:joran@joranquinten.nl), January 2017
