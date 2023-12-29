import { expect, describe, it } from "bun:test"
import { ConsoleProgressBar } from "../source/index"

it("integration", async () => {
  const bar = new ConsoleProgressBar(100)
  for (let i = 0; i < 100; i++) {
    await new Promise((resolve) => setTimeout(resolve, 10))
    bar.update(i)
    expect(bar["eta"].estimate()).toBeGreaterThan(0)
    expect(
      bar["generateProgressBarString"](bar["getPercentage"]())
    ).toBeDefined()
  }
})
