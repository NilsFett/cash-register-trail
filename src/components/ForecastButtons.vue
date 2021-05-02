<template>
  <div class="forecast-buttons">
    <button-forecast v-for="forecastValue in getForecastValues" :key="forecastValue" v-bind:key-value="forecastValue"></button-forecast>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ButtonForecast from './ButtonForecast.vue'

@Options({
  name: 'ForecastButtons',
  components: {
    ButtonForecast
  }
})
export default class ForecastButtons extends Vue {
  private forecastValues: number[] = []
  private forecastValuesSteps: number[] = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000]
  private usedValuesCount = 0
  private usedValues:number[] = []
  private highestSingleValuBelow = 0

  private getNearestLower (value:number): number {
    console.log('getNearestLower')
    let current = 0
    let last = 0
    do {
      last = current
      for (let i = this.forecastValuesSteps.length; i >= 0; i--) {
        if ((value / 10) > this.forecastValuesSteps[i]) break
        if ((this.forecastValuesSteps[i] + current) < value) {
          current += this.forecastValuesSteps[i]
          console.log('current changed')
          console.log(current)
          break
        }
      }
      console.log(`${current}:${last}`)
    } while (last !== current)
    return last
  }

  private getNearestHigherWithOneStep (nearestLower:number, toPayValue:number, nearestHighers: number[]): number[] {
    console.log('getNearestHigherWithOneStep')
    console.log(nearestLower)
    console.log(toPayValue)
    let nearestHigher = 0
    let added = false
    for (let i = 0; i < this.forecastValuesSteps.length; i++) {
      if (!added) {
        nearestHigher = this.forecastValuesSteps[i] + nearestLower
        if (nearestHigher > toPayValue) {
          if (!nearestHighers.includes(nearestHigher)) {
            console.log('byAdded')
            console.log(nearestHigher)
            nearestHighers.push(nearestHigher)
            if (nearestHigher === (Math.ceil(nearestHigher / 10) * 10)) {
              added = true
            }
          }
        }
      }
      if (this.forecastValuesSteps[i] > toPayValue) {
        if (!nearestHighers.includes(this.forecastValuesSteps[i])) {
          console.log('byAdded')
          console.log(this.forecastValuesSteps[i])
          nearestHighers.push(this.forecastValuesSteps[i])
        }
      }
      if (nearestHighers.length > 4) return nearestHighers
    }
    return this.getNearestHigherWithOneStep(nearestHigher, toPayValue, nearestHighers)
  }

  private calcutateNextPossibleGivenValue (toPayValue:number, found:number[]): number[] {
    const nearestLower = this.getNearestLower(toPayValue)
    console.log('nearestLower')
    console.log(nearestLower)
    // if (nearestLower === toPayValue) return nearestLower
    return this.getNearestHigherWithOneStep(nearestLower, toPayValue, found)
  }

  private addAmountAndKeepBelow (keepBelowMaxValue:number, maxValue:number, returnAddValue:boolean): number {
    console.log('addAmountAndKeepBelow')
    console.log(`keepBelowMaxValue${keepBelowMaxValue}`)
    console.log(`maxValue${maxValue}`)
    for (let i = this.forecastValuesSteps.length; i >= 0; i--) {
      if ((this.forecastValuesSteps[i] + keepBelowMaxValue) <= maxValue) {
        if (returnAddValue) {
          console.log(`return${this.forecastValuesSteps[i]}`)
          return this.forecastValuesSteps[i]
        } else {
          return (keepBelowMaxValue + this.forecastValuesSteps[i])
        }
      }
    }
    console.log(keepBelowMaxValue)
    return 0
  }

  private addLowestPossible (toAddValue:number, toPayValue:number): number {
    for (let i = 0; i < this.forecastValuesSteps.length; i++) {
      if ((toAddValue + this.forecastValuesSteps[i]) >= toPayValue) {
        if (!this.forecastValues.includes(toAddValue + this.forecastValuesSteps[i])) {
          return (toAddValue + this.forecastValuesSteps[i])
        }
      }
    }
    return toAddValue
  }

  private getNextHigherValue (lowerThan:number): number {
    console.log('getNextHigherValue')
    for (let i = 0; i < this.forecastValuesSteps.length; i++) {
      if (this.forecastValuesSteps[i] > lowerThan) {
        return this.forecastValuesSteps[i]
      }
    }
    return 50000
  }

  private fillUpToFiveWithSinglePiecePay (toPayValue:number): void {
    console.log('fillUpToFiveWithSinglePiecePay')
    for (let i = 0; i < this.forecastValuesSteps.length; i++) {
      if (this.forecastValuesSteps[i] > toPayValue) {
        if (!this.forecastValues.includes(this.forecastValuesSteps[i])) {
          this.forecastValues.push(this.forecastValuesSteps[i])
        }
      }
      if (this.forecastValues.length > 4) return
    }
  }

  private round (value:number, precision:number):number {
    const multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
  }

  private addNearestWithMinParts (toPayValue:number): void {
    console.log('addNearestWithMinParts')
    const keepBelowToPayValue = this.addAmountAndKeepBelow(0, toPayValue, false)
    console.log(`keepBelowToPayValue${keepBelowToPayValue}`)
    const nearestWithMinParts = this.addLowestPossible(keepBelowToPayValue, toPayValue)
    console.log(`nearestWithMinParts${nearestWithMinParts}`)
    this.forecastValues.push(nearestWithMinParts)
  }

  private addNearest (toPayValue:number): void {
    console.log('addNearest')
    this.highestSingleValuBelow = this.addAmountAndKeepBelow(0, toPayValue, false)
    console.log(`highestSingleValuBelow${this.highestSingleValuBelow}`)
    const rest = toPayValue - this.highestSingleValuBelow
    console.log(`rest${rest}`)
    if (rest === 0) return
    const becomeHigherThanRestRoundedUp = this.getNextHigherValue(rest)
    this.usedValues.push(becomeHigherThanRestRoundedUp)
    this.forecastValues.push(becomeHigherThanRestRoundedUp + this.highestSingleValuBelow)
  }

  private addNearestRoundedUp (toPayValue:number): void {
    console.log('addNearestRoundedUp')
    this.highestSingleValuBelow = this.addAmountAndKeepBelow(0, toPayValue, false)
    console.log(`highestSingleValuBelow${this.highestSingleValuBelow}`)
    const rest = toPayValue - this.highestSingleValuBelow
    console.log(`rest${rest}`)
    let restRoundedUp = rest
    if (rest > 100) {
      restRoundedUp = Math.ceil(rest / 100) * 100
    }

    console.log(`restRoundedUp${restRoundedUp}`)
    let temp = 0
    let becomeHigherThanRestRoundedUp = 0
    do {
      temp = this.addAmountAndKeepBelow(becomeHigherThanRestRoundedUp, restRoundedUp, true)
      console.log(`temp${temp}`)
      // if ((becomeHigherThanRestRoundedUp + temp) > restRoundedUp) break
      console.log(`(becomeHigherThanRestRoundedUp + temp)${(becomeHigherThanRestRoundedUp + temp)}`)
      /*
      if ((becomeHigherThanRestRoundedUp + temp) === restRoundedUp) {
        temp = this.getNextHigherValue(temp)
      }
      */
      becomeHigherThanRestRoundedUp += temp
      console.log(`becomeHigherThanRestRoundedUp${becomeHigherThanRestRoundedUp}`)
      this.usedValuesCount++
      if (temp > 0) {
        this.usedValues.push(temp)
      }
    } while (temp > 0 && becomeHigherThanRestRoundedUp <= restRoundedUp)
    if ((becomeHigherThanRestRoundedUp + this.highestSingleValuBelow) !== toPayValue) {
      this.forecastValues.push(becomeHigherThanRestRoundedUp + this.highestSingleValuBelow)
    }
  }

  private meldPairInHigherValue (toMeld: number[]) : void {
    console.log('meldPairInHigherValue')
    console.log(toMeld)
    let meldValuesSum = 0
    let i
    for (i = 0; i < toMeld.length; i++) {
      meldValuesSum += toMeld[i]
    }
    console.log(`meldValuesSum${meldValuesSum}`)
    for (i = 0; i < this.forecastValuesSteps.length; i++) {
      if (this.forecastValuesSteps[i] > meldValuesSum) {
        console.log(`pushing${this.forecastValuesSteps[i]}`)
        this.usedValues.push(this.forecastValuesSteps[i])
        break
      }
    }
    let newValue = 0
    for (i = 0; i < this.usedValues.length; i++) {
      newValue += this.usedValues[i]
    }
    if (newValue + this.highestSingleValuBelow < 50000) {
      console.log(`pushing new values ${(newValue + this.highestSingleValuBelow)}`)
      this.forecastValues.push(newValue + this.highestSingleValuBelow)
    }
  }

  get getForecastValues (): number[] {
    const toPayValue = parseInt(this.$store.getters.getToPayValueString, 10)
    this.usedValuesCount = 0
    this.usedValues = []
    console.log('toPayValue')
    console.log(toPayValue)
    this.forecastValues = []
    if (toPayValue) {
      this.forecastValues.push(toPayValue)
      /*
      let roundUp: number
      if (toPayValue > 10000) {
        roundUp = Math.ceil(toPayValue / 10000) * 10000
        if (roundUp !== toPayValue) {
          this.forecastValues.push(roundUp)
        }
      } else if (toPayValue > 1000) {
        roundUp = Math.ceil(toPayValue / 1000) * 1000
        if (roundUp !== toPayValue) {
          this.forecastValues.push(roundUp)
        }
      } else */
      if (toPayValue > 100) {
        this.addNearestRoundedUp(toPayValue)
        if (this.usedValues.length > 1) {
          console.log(`this.usedValues${this.usedValues}`)
          const toMeldInHigherValue: number[] = this.usedValues.splice(-2)
          this.meldPairInHigherValue(toMeldInHigherValue)
        }
      } else if (toPayValue > 10) {
        this.addNearest(toPayValue)
      }
      this.fillUpToFiveWithSinglePiecePay(toPayValue)

      /*
      this.allowedSteps--
      if (this.allowedSteps > 0) {
        this.withFourStepsHigher(toPayValue)
        this.allowedSteps--
      }
      if (this.allowedSteps > 0) {
        this.withFourStepsHigher(toPayValue)
        this.allowedSteps--
      }
      this.fillUpToFiveWithSinglePiecePay(toPayValue)
      */
      /*
      if (!this.withThreeStepsHigher(toPayValue)) {
        this.fillUpToFiveWithSinglePicePay(toPayValue)
      }
      if (!this.withTwoStepsHigher(toPayValue)) {
        this.fillUpToFiveWithSinglePicePay(toPayValue)
      }
      if (!this.withOneStepHigher(toPayValue)) {
        this.fillUpToFiveWithSinglePicePay(toPayValue)
      }
      */
      /*
      let nextPossibleGivenValue: number = toPayValue
      if (toPayValue > 10) {
        nextPossibleGivenValue = Math.ceil(toPayValue / 10) * 10
        this.forecastValues.push(nextPossibleGivenValue)
      }
      this.forecastValues.concat(this.calcutateNextPossibleGivenValue(toPayValue, this.forecastValues))
      */
    }
    console.log('this.forecastValues')
    console.log(this.forecastValues)
    return this.forecastValues
  }
}
</script>
