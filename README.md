# Building Navigator Rebuild

Interactive map with accessible information about places in Leipzig.

## HowTo Run

Checkout this repository and open the `dist/index.html` file into your browser.

## Requirements

Modern Browser with JavaScript enabled.

## Architecture and software details

![](./assets/architecture.png)

The architexture is inspired by Redux/Flux and implements a simple data-event flow.

The main class `BuildingNavigator` holds the stores as state and passes them to the rendered components. It also passes events from the components to the `EventHandler`.

All components extends the `React.Component`, output some html and can hold passed props as local states.

To handle an event, the components can call `super.handleEvent(event)` to execute an action in the `EventHandler`. The action calls a method in a store to change some data.

After changing data in a store the `BuildingNavigator` re-renders all components with the new data.

## Folder and file structure

```
* assets/                   // repository files
* dist/                     // ready to run software
    - data/                 // buildings data as json
    - fonts/
    - images/
    - libraries/            // external css libraries
    - index.html
    - app.min.js
    - style.css
* src/
    - components/           // view components, seperated into subfolders
        + map/      
        + sidebar/
        + Map.js
        + Sidebar.js
    - stores/               // BuildingStore, FilterStore etc.
    - utils/                // additional utilities
    - BuildingNavigator.js  // main controler class
    - EventHandler.js 
    - main.js
* test/                     // tests
* README.md
* package.json              // npm configuration
* webpack.config.js         // webpack configuration
```


## Developing

As developing environment we use a Docker container with Node.js, NPM, Webpack etl. al. from: https://github.com/Dockerizing/NodeJS-NPM-ECMA6-Stack

Mount this project into the container and access http://localhost:8080.

Code documentation is done in JSDoc style.

Testing is made with Jest (run `npm test`).

### Create Production

To create the production files in `./dist/` exec into the Docker container and run:

    npm run build-dist
