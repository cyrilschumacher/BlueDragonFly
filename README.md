# Blue DragonFly
> The Back-End part for my portfolio.

[![Build Status][travis-image]][travis-url]
[![MIT License][license-image]][license-url]
[![typescript-standard-style][standard-image]][standard-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![david-dm Status][david-image]][david-url]
[![david-dm devDependency Status][david-dev-dependencies-image]][david-dev-dependencies-url]

Blue DragonFly is the back-end for my portfolio website which is available at: [www.cyrilschumacher.fr](http://www.cyrilschumacher.fr/). The project use the [Node.js](http://nodejs.org/) environment with [TypeScript](http://www.github.com/Microsoft/TypeScript) language.

For front-end, see the [Persona](http://www.github.com/cyrilschumacher/Persona) project.

## Getting Started
### Software requirements
This project requires :
- Node.js
- [gulp.js](http://gulpjs.com/)

### Before build
For install Gulp, [TypeScript Definition Manager](http://www.github.com/DefinitelyTyped/tsd) and Node.js dependencies, you must enter the following commands from favorite terminal:

```
npm install -g gulp
npm install -g tsd
npm install
tsd install
```

### Build
For build the project, enter the command:

```
gulp
```

### Execute
And for execute the server:

```
npm start
```

## Copyright and license

> The MIT License (MIT)
>
> Copyright (c) 2016 Cyril Schumacher.fr
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

[travis-url]: https://travis-ci.org/cyrilschumacher/BlueDragonFly
[travis-image]: https://travis-ci.org/cyrilschumacher/BlueDragonFly.svg
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines
[coveralls-url]: https://coveralls.io/github/cyrilschumacher/BlueDragonFly
[coveralls-image]: https://coveralls.io/repos/cyrilschumacher/BlueDragonFly/badge.svg
[david-url]: https://david-dm.org/cyrilschumacher/BlueDragonFly
[david-image]: https://david-dm.org/cyrilschumacher/BlueDragonFly.svg
[david-dev-dependencies-image]: https://david-dm.org/cyrilschumacher/BlueDragonFly/dev-status.svg
[david-dev-dependencies-url]: https://david-dm.org/cyrilschumacher/BlueDragonFly#info=devDependencies
