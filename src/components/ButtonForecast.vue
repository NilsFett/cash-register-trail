<template>
  <button @click="clicked"><span>€ {{getDisplayString}}</span></button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'ButtonForecast',
  props: {
    keyValue: Number
  }
})
export default class ButtonForecast extends Vue {
  private emitter: any
  private keyValue! :string

  get getDisplayString (): string {
    let displayString = `${this.keyValue}`
    while (displayString.length < 4) {
      displayString = `0${displayString}`
    }
    const commaInsertPos = displayString.length - 2
    return [displayString.slice(0, commaInsertPos), ',', displayString.slice(commaInsertPos)].join('')
  }

  private clicked () {
    this.$store.commit('changeGivenValueString', this.keyValue)
    this.emitter.emit('changeFocusToPaidAmountInput')
  }
}

</script>
