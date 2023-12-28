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

    await test("string eta should throw", async () => {
      const progressBar = new ConsoleProgressBar(100)
      throws(() => {
        progressBar["generateProgressBarString"](50, "hi" as any)
      })
    })

    await test("negative eta should not throw", async () => {
      const progressBar = new ConsoleProgressBar(100)
      const line = progressBar["generateProgressBarString"](50, -0.0113)
      console.log(line)
      strictEqual(typeof line === "string", true)
    })

    await test("infinity eta should not throw", async () => {
      const progressBar = new ConsoleProgressBar(100)
      const line = progressBar["generateProgressBarString"](
        50,
        Number.POSITIVE_INFINITY
      )
      console.log(line)
      strictEqual(typeof line === "string", true)
    })
  })

  await test("calculate", async () => {
    await test("50/100 should be 50%", async () => {
      const { percentage } = ConsoleProgressBar.calculate(
        performance.now(),
        50,
        100,
        performance.now()
      )
      strictEqual(percentage, 50)
    })

    await test("eta in the future should be a positive number", async () => {
      const { eta } = ConsoleProgressBar.calculate(
        performance.now(),
        50,
        100,
        performance.now() - 10_000
      )
      strictEqual(eta > 0, true)
    })

    await test("eta in the past should be a negative number", async () => {
      const { eta } = ConsoleProgressBar.calculate(
        performance.now(),
        50,
        100,
        performance.now() + 10_000
      )
      strictEqual(eta < 0, true)
    })
  })
})
