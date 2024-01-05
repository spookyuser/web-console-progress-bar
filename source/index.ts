import ms from "ms"
import makeEta from "simple-eta"

export class ConsoleProgressBar {
  /**
   * The estimated time of arrival.
   */
  eta: ReturnType<typeof makeEta>
  /**
   * The timestamp of the last update.
   */
  lastUpdate: number
  private current = 0

  /**
   * Creates a new instance of ConsoleProgressBar.
   * @param total The total number of items to process.
   * @param updateInterval The interval (in milliseconds) at which to update the progress bar.
   * @param clearConsole Indicates whether to clear the console before updating the progress bar.
   * @throws {TypeError} If total or updateInterval is not a number.
   */
  constructor(
    public total: number,
    public updateInterval = 2000,
    public clearConsole = true
  ) {
    if (typeof total !== "number") {
      throw new TypeError("total must be a number")
    }

    if (typeof updateInterval !== "number") {
      throw new TypeError("updateInterval must be a number")
    }

    this.updateInterval = updateInterval
    this.eta = makeEta({ min: 0, max: total })
    this.eta.start()
    this.lastUpdate = performance.now()
  }

  /**
   * Updates the current value of the progress bar.
   * @param currentValue The current value.
   * @throws {TypeError} If currentValue is not a number.
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
    this.eta.report(currentValue)

    if (this.clearConsole) console.clear()
    console.log(
      this.generateProgressBarString(
        this.getPercentage(),
        this.eta.estimate() * 1000
      )
    )

    this.lastUpdate = now // Update the lastUpdate time
  }

  private getPercentage() {
    return (this.current / this.total) * 100
  }

  /**
   * Generates a progress bar string with the given percentage and estimated time of arrival (ETA).
   *
   * @param percentage - The progress percentage as a number.
   * @param eta - The estimated time of arrival in milliseconds (optional).
   * @returns The generated progress bar string.
   * @throws {TypeError} If the percentage is not a number.
   */
  private generateProgressBarString(
    percentage: number,
    eta?: number | undefined
  ) {
    if (typeof percentage !== "number") {
      throw new TypeError("percentage must be a number")
    }

    const bar = this.renderBar(percentage)
    const formattedPercentage = percentage.toFixed(2)
    const formattedEta =
      typeof eta === "number" && Number.isFinite(eta)
        ? ms(Math.round(eta))
        : "Calculating..."

    return `Progress: [${bar}] ${formattedPercentage}% ETA: ${formattedEta}`
  }

  /**
   * Renders a progress bar based on the given percentage.
   *
   * @param percentage - The percentage value to represent the filled portion of the progress bar.
   * @returns The rendered progress bar as a string.
   */
  private renderBar(percentage: number) {
    const barLength = 20
    const filledLength = Math.round((barLength * percentage) / 100)
    const bar = "█".repeat(filledLength) + "░".repeat(barLength - filledLength)
    return bar
  }
}
