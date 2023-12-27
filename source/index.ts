/**
 * Represents a console progress bar that tracks the progress of a task.
 */
export class ConsoleProgressBar {
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
    const now = performance.now()
    if (now - this.lastUpdate < this.updateInterval) {
      return
    }

    this.current = currentValue
    const percentage = (this.current / this.total) * 100
    const elapsedTime = now - this.startTime
    const estimatedTotalTime = (elapsedTime / this.current) * this.total
    const eta = (estimatedTotalTime - elapsedTime) / 1000 // Seconds

    console.clear()
    console.log(
      `Progress: [${this.renderBar(
        percentage
      )}] ${percentage}% ETA: ${eta.toFixed(2)}s`
    )

    this.lastUpdate = now
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
