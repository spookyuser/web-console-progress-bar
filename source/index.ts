import ms from "ms"
import makeEta from "simple-eta"

export class ConsoleProgressBar {
  eta: ReturnType<typeof makeEta>
  lastUpdate: number
  private current = 0

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

  update(currentValue: number) {
    if (typeof currentValue !== "number") {
      throw new TypeError("currentValue must be a number")
    }

    if (performance.now() - this.lastUpdate < this.updateInterval) {
      return
    }

    this.current = currentValue
    this.eta.report(currentValue)

    if (this.clearConsole) console.clear()
    console.log(
      this.generateProgressBarString(
        this.getPercentage(),
        this.eta.estimate() * 1000
      ) // We need ms so
    )
  }

  private getPercentage() {
    return (this.current / this.total) * 100
  }

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

  private renderBar(percentage: number) {
    const barLength = 20
    const filledLength = Math.round((barLength * percentage) / 100)
    const bar = "█".repeat(filledLength) + "░".repeat(barLength - filledLength)
    return bar
  }
}
