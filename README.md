# Der Gebäude-Navigator (Building Navigator)

This tool provides an interactive map with accessible information about places in Leipzig. You can move on the map or search buildings with certain filters. The filters provide restrictions such as accessibility requirements for the entrances, the lift or the toilet.

**Important:** This tool is under heavy development with focus on refinement and UI improvements. Furthermore supporting screenreaders and text-to-speech software is also one of the primary objectives.

**Screenshot:**

![](https://github.com/AKSW/building-navigator/raw/rebuild/assets/screenshot-1.png)

**Mobile:**

![](https://github.com/AKSW/building-navigator/raw/rebuild/assets/screenshot-3.png)

## Experiences with screenreaders

- **TalkBack** for Android with ChromeMobile
    + Tab-Control with swipe left/right for next element
    + Change tab-filigranity with swipe up or down
    + Apply selected element with double-tab (somewhere on the screen)
- **ChromeVox** Extension for Chrome
    + Control with Tabulator (next sibling element) and Str+Arrow-Keys (next child element)
    + Change select-filter with arrow keys, checkboxes with space
    + Select Links Enter, Buttons Space or Enter
    + Scroll with two fingers (a quite sound gives the position by a pitch level)
- **COBRA** (Windows), **NVDA** (Windows), **Orca** (Linux with eSpeak)
    + Control with Tabulator to select links or headings
    + Selecgt links or buttons with Space or Enter
    + Use Arrow-Keys to read content
- **TODO:** iOS Screenreader

## The team behind the scene

This tool is being developed by [Simeon Ackermann](https://github.com/simeonackermann) and [Konrad Abicht](https://github.com/k00ni) as part of the [LEDS-project](http://www.leds-projekt.de/de/linked-enterprise-data-services.html). We work together with the [Behindertenverband Leipzig e.V.](http://www.le-online.de/), a non-profit organization located in Leipzig, which cares about issue of disabled people.

## For developers

### HowTo Run

Checkout this repository and open the `dist/index.html` file into your browser.

### Architecture and software details

![](./assets/architecture.png)

The architexture is inspired by Redux/Flux and implements a simple data-event flow.

The main class `BuildingNavigator` holds the stores as state and passes them to the rendered components. It also passes events from the components to the `EventHandler`.

All components extends the `React.Component`, output some html and can hold passed props as local states.

To handle an event, the components can call `super.handleEvent(event)` to execute an action in the `EventHandler`. The action calls a method in a store to change some data.

After changing data in a store the `BuildingNavigator` re-renders all components with the new data.

### Folder and file structure

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
    - EventHandler.js       // event handler class
    - main.js               // entry point
* test/                     // tests
* README.md
* package.json              // npm configuration
* webpack.config.js         // webpack configuration
```


### Developing environment

As developing environment we use a Docker container with Node.js, NPM, Webpack etl. al. from: https://github.com/k00ni/Docker-Nodejs-environment

Mount this project into the container and access http://localhost:8080.

Code documentation is done in JSDoc style.

#### Test

We use Jest and Enzyme for React GUI tests, and Sinon for asynchronous tests. All current tests are in `./tests` and could started in the Docker container with:

    npm test


### Create Production

To create the production files in `./dist/` exec into the Docker container and run:

    npm run build-dist
