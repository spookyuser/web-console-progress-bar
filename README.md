# web-console-progress-bar

[![NPM Version](https://img.shields.io/npm/v/web-console-progress-bar.svg)](https://www.npmjs.com/package/web-console-progress-bar)

> A progress bar for the browser console.

## Install

```sh
npm install web-console-progress-bar
```

## Usage

```js
import { ConsoleProgressBar } from "web-console-progress-bar"

const progressBar = new ConsoleProgressBar(100)
progressBar.update(10)
//=> Progress: [██████░░░░░░░░░░░░] 10% ETA: XXs
```

## API

### ConsoleProgressBar(total, updateInterval?)

Creates a new progress bar instance.

#### total

Type: `number`

The total number of units to be processed.

#### updateInterval

Type: `number`Default: `2000`

The interval in milliseconds at which the progress bar should be updated.

### update(currentValue)

Updates the progress bar with the current value.

#### currentValue

Type: `number`

The current value of the progress.
