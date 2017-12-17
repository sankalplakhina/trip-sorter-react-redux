# Trip Sorter (A React/Redux implementation)

[![Demo on Heroku](https://img.shields.io/badge/demo-heroku-brightgreen.svg?style=flat-square)](https://trip-sorter-react.herokuapp.com)

## Demo

A demonstration of this app can be seen [here](https://trip-sorter-react.herokuapp.com), which is a deployment of the [master branch](https://github.com/sankalplakhina/trip-sorter-react-redux/tree/master).

## About

This is a simple Web App to help users find the cheapest or fastest way to travel from a city to another. It will find the complete continuous path to go from a city to another, considering different sorting types (cheapest or fastest).

*It's implemented by considering all cities as `vertices` of a Graph and cost/duration as `weight` of edges between these vertices. And then finding the shortest path with the help **Dijkstra’s shortest path algorithm**.*

## API documentation

Presently, all the available transportation deals are served from `/api/dummy/controllers/deals.js`. API documentaion for one deal is as follows:

```
{
    "transport": "train",
    "departure": "London", "arrival": "Amsterdam", "duration": {
    "h": "03",
    "m": "30" },
    "cost": 160, "discount": 50, "reference": "TLA0330"
}
```
* `transport`: train, bus, car
* `departure`: departure city’s name in English
* `arrival`: arrival city’s name in English
* `duration.h`: trip’s duration hours
* `duration.m`: trip’s duration minutes
* `cost`: cost **not** discounted, this is the base price
* `discount`: discount in % to apply to the base price
* `reference`: deal unique reference number

## Put togerther using following technologies

* ~~Isomorphic~~ [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) rendering
* Both client and server make calls to load data from separate API server(configurable port 3001)
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/rackt/redux)
* [React Router](https://github.com/rackt/react-router)
* [React Router Redux](https://github.com/reactjs/react-router-redux) Redux/React Router bindings.
* [react-helmet](https://github.com/nfl/react-helmet) to manage title and meta tag information on both server and client
* [Express](http://expressjs.com)
* [Babel](http://babeljs.io) for ES6 magic
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) to allow require() work for statics both on client and server
* [Bootstrap 3](https://getbootstrap.com/docs/3.3/) for responsive css grid system
* [jkstra](https://github.com/bbecquet/jKstra) - Graph routing library

and many more(refer `package.json`).

## Developing?

* Run `npm install` to install dependencies.
* Run `npm run dev` to start server, api & webpack.

## Production?

* Run `npm run start` to build assets for production & start the app in production mode.
