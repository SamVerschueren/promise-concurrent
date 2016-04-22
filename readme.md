# promise-concurrent [![Build Status](https://travis-ci.org/SamVerschueren/promise-concurrent.svg?branch=master)](https://travis-ci.org/SamVerschueren/promise-concurrent)

> Execute a list of promises with a limited concurrency


## Install

```
$ npm install --save promise-concurrent
```


## Usage

```js
const promiseConcurrent = require('promise-concurrent');
const got = require('got');

const endpoints = [
	got.bind(got, 'todomvc.com'),
	got.bind(got, 'yeoman.io'),
	got.bind(got, 'ava.li')
];

promiseConcurrent(endpoints, 1).then(result => {
	console.log(result);
	//=> array of response objects
});
```


## API

### promiseConcurrent(promises, [concurrency])

#### promises

Type: `function[]`

Array of functions that return a promise.

#### concurrency

Type: `number`<br>
Default: `0`

Number of concurrent executions. `0` means maximum concurrency.


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
