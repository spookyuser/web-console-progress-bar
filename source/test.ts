import { strictEqual, throws } from "node:assert"
import { test } from "node:test"
import { ConsoleProgressBar } from "./index.js"

await test("ConsoleProgressBar", async () => {
  await test("constructor", async () => {
    await test("should throw if total is not a number", async () => {
      throws(() => new ConsoleProgressBar("foo" as any))
    })

    await test("should throw if updateInterval is not a number", async () => {
      throws(() => new ConsoleProgressBar(10, "foo" as any))
    })

    await test("should set the total", async () => {
      const progressBar = new ConsoleProgressBar(10)
      strictEqual(progressBar.total, 10)
    })

    await test("should set the updateInterval", async () => {
      const progressBar = new ConsoleProgressBar(10, 1000)
      strictEqual(progressBar.updateInterval, 1000)
    })

    await test("should set the default updateInterval", async () => {
      const progressBar = new ConsoleProgressBar(10)
      strictEqual(progressBar.updateInterval, 2000)
    })
  })

  await test("update", async () => {
    await test("should throw if currentValue is not a number", async () => {
      const progressBar = new ConsoleProgressBar(10)
      throws(() => {
        progressBar.update("foo" as any)
      })
    })

    await test("should not update if the interval has not passed", async () => {
      const progressBar = new ConsoleProgressBar(10)
      progressBar["lastUpdate"] = performance.now()
      progressBar.update(5)
      strictEqual(
        progressBar["lastUpdate"].toFixed(0),
        performance.now().toFixed(0)
      )
      strictEqual(progressBar.current, 0)
    })

    await test("should update if the interval has passed", async () => {
      const progressBar = new ConsoleProgressBar(10)
      progressBar["lastUpdate"] = performance.now() - 2000
      progressBar.update(5)
      strictEqual(progressBar.current, 5)
    })
  })

  await test("renderBar", async () => {
    await test("should render the bar", async () => {
      const progressBar = new ConsoleProgressBar(10)
      const bar = progressBar["renderBar"](50)
      strictEqual(bar, "██████████░░░░░░░░░░")
    })

    await test("should console log the bar", async () => {
      const progressBar = new ConsoleProgressBar(10)
      const string = progressBar["generateProgressBarString"](50, 2000)
      strictEqual(string, "Progress: [██████████░░░░░░░░░░] 50.00% ETA: 2s")
    })
  })
})
