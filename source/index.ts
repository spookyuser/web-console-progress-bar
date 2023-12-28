import ms from "ms"

/**
 * Represents a console progress bar that tracks the progress of a task.
 */
export class ConsoleProgressBar {
  static calculate(
    now: number,
    current: number,
    total: number,
    startTime: number
  ) {
    const percentage = (current / total) * 100
    const elapsedTime = now - startTime
    const estimatedTotalTime = (elapsedTime / current) * total
    const eta = estimatedTotalTime - elapsedTime
    return { percentage, eta }
  }

  current: number
  startTime: number
  updateInterval: number
  lastUpdate: number

  /**
   * Creates a new instance of ConsoleProgressBar.
   * @param total The total number of units to be processed.
   * @param updateInterval The interval at which the progress bar should be updated, in milliseconds. Default is 2000ms.
   */
  constructor(
    public total: number,
    updateInterval = 2000
  ) {
    if (typeof total !== "number") {
      throw new TypeError("total must be a number")
    }

    if (typeof updateInterval !== "number") {
      throw new TypeError("updateInterval must be a number")
    }

    this.current = 0
    this.startTime = performance.now()
    this.updateInterval = updateInterval
    this.lastUpdate = 0
  }

  /**
   * Updates the progress bar with the current value.
   * @param currentValue The current value of the progress.
   */
  update(currentValue: number) {
    if (typeof currentValue !== "number") {
      throw new TypeError("currentValue must be a number")
    }

    const now = performance.now()
    if (now - this.lastUpdate < this.updateInterval) {
      return
    }

    this.current = currentValue
    const { percentage, eta } = ConsoleProgressBar.calculate(
      now,
      currentValue,
      this.total,
      this.startTime
    )

    console.clear()
    console.log(this.generateProgressBarString(percentage, eta))

    this.lastUpdate = now
  }

  /**
   * Generates the progress bar string based on the given percentage and ETA.
   * @param percentage The percentage of progress completed.
   * @param eta The estimated time remaining.
   * @returns The progress bar string.
   */
  private generateProgressBarString(percentage: number, eta: number) {
    if (typeof eta !== "number") throw new TypeError("eta must be a number")
    if (typeof percentage !== "number")
      throw new TypeError("percentage must be a number")

    const bar = this.renderBar(percentage)
    const formattedPercentage = percentage.toFixed(2)
    const formattedEta = Number.isFinite(eta) ? ms(eta) : "∞"

    return `Progress: [${bar}] ${formattedPercentage}% ETA: ${formattedEta}`
  }

  /**
   * Renders the progress bar based on the given percentage.
   * @param percentage The percentage of progress completed.
   * @returns The rendered progress bar.
   */
  private renderBar(percentage: number) {
    const barLength = 20
    const filledLength = Math.round((barLength * percentage) / 100)
    const bar = "█".repeat(filledLength) + "░".repeat(barLength - filledLength)
    return bar
  }
}
