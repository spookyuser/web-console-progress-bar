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

### Constructor

```typescript
constructor(total: number, updateInterval?: number, clearConsole?: boolean)
```

Creates a new instance of `ConsoleProgressBar`.

- `total` (number): The total number of items to process.
- `updateInterval` (number, optional): The interval (in milliseconds) at which to update the progress bar. Default is 2000.
- `clearConsole` (boolean, optional): Indicates whether to clear the console before updating the progress bar. Default is true.

### Method: update

```typescript
update(currentValue: number): void
```

Updates the current value of the progress bar.

- `currentValue` (number): The current value.

## Example Usage

```typescript
const progressBar = new ConsoleProgressBar(100)

for (let i = 0; i <= 100; i++) {
  progressBar.update(i)
  // Simulate some delay
  await new Promise((resolve) => setTimeout(resolve, 100))
}
```

This will create a progress bar in the console that updates every 2 seconds (default `updateInterval`), and clears the console before each update (default `clearConsole`).
