<template>
  <div class="chashback-modal" v-bind:class="{ visible: getIsVisible }">
    <div class="alignment-wrapper">
      <div>
        <h1>€{{getPayback}}</h1>
        <button @click="close">neue Eingabe</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'CashbackModal'
})
export default class CashbackModal extends Vue {
  private emitter: any
  
  get getIsVisible (): boolean {
    return this.$store.getters.getShowCashbackModal
  }

  get getPayback (): string {
    const toPayValueString = this.$store.getters.getToPayValueString
    let toPayValue

    if (toPayValueString === '') {
      toPayValue = 0
    } else {
      toPayValue = parseInt(this.$store.getters.getToPayValueString)
    }
    const givenValueString = this.$store.getters.getGivenValueString
    let givenValue

    if (givenValueString === '') {
      givenValue = 0
    } else {
      givenValue = parseInt(givenValueString)
    }
    let displayString = `${(givenValue - toPayValue)}`
    while (displayString.length < 4) {
      displayString = `0${displayString}`
    }
    const commaInsertPos = displayString.length - 2
    return [displayString.slice(0, commaInsertPos), ',', displayString.slice(commaInsertPos)].join('')
  }

  close (): void {
    this.$store.commit('closeCashbackModal')
    this.emitter.emit('changeFocusToToPayAmountInput')
  }
}
</script>
