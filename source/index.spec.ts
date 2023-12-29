import { expect, describe, it } from "bun:test"
import { ConsoleProgressBar } from "./index"

describe("ConsoleProgressBar", () => {
  describe("constructor", () => {
    it("should throw if total is not a number", () => {
      expect(() => new ConsoleProgressBar("foo" as any)).toThrow()
    })

    it("should throw if updateInterval is not a number", () => {
      expect(() => new ConsoleProgressBar(10, "foo" as any)).toThrow()
    })

    it("should set the total", () => {
      const progressBar = new ConsoleProgressBar(10)
      expect(progressBar.total).toBe(10)
    })

    it("should set the updateInterval", () => {
      const progressBar = new ConsoleProgressBar(10, 1000)
      expect(progressBar.updateInterval).toBe(1000)
    })

    it("should set the default updateInterval", () => {
      const progressBar = new ConsoleProgressBar(10)
      expect(progressBar.updateInterval).toBe(2000)
    })
  })

  describe("update", () => {
    it("should throw if currentValue is not a number", () => {
      const progressBar = new ConsoleProgressBar(10)
      expect(() => {
        progressBar.update("foo" as any)
      }).toThrow()
    })

    it("should not update if the interval has not passed", () => {
      const progressBar = new ConsoleProgressBar(10)
      progressBar["lastUpdate"] = performance.now()
      progressBar.update(5)
      expect(progressBar["current"]).toBe(0)
    })

    it("should update if the interval has passed", () => {
      const progressBar = new ConsoleProgressBar(10)
      progressBar["lastUpdate"] = performance.now() - 2000
      progressBar.update(5)
      expect(progressBar["current"]).toBe(5)
    })
  })

  describe("renderBar", () => {
    it("should render the bar", () => {
      const progressBar = new ConsoleProgressBar(10)
      const bar = progressBar["renderBar"](50)
      expect(bar).toBe("██████████░░░░░░░░░░")
    })

    it("should console log the bar", () => {
      const progressBar = new ConsoleProgressBar(10)
      const string = progressBar["generateProgressBarString"](50, 2000)
      expect(string).toBe("Progress: [██████████░░░░░░░░░░] 50.00% ETA: 2s")
    })

    it("negative eta should not throw", () => {
      const progressBar = new ConsoleProgressBar(100)
      const line = progressBar["generateProgressBarString"](50, -0.0113)
      console.log(line)
      expect(typeof line === "string").toBe(true)
    })

    it("infinity eta should not throw", () => {
      const progressBar = new ConsoleProgressBar(100)
      const line = progressBar["generateProgressBarString"](
        50,
        Number.POSITIVE_INFINITY
      )
      console.log(line)
      expect(typeof line === "string").toBe(true)
    })
  })

  describe("calculate", () => {
    it("50/100 should be 50%", () => {
      const progressBar = new ConsoleProgressBar(100)
      progressBar["current"] = 50
      const percentage = progressBar["getPercentage"]()
      expect(percentage).toBe(50)
    })
  })
})
