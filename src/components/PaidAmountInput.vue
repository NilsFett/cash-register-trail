<template>
  <div v-bind:class="{ focus: hasFocus }">
    <input type="number" @keyup="keyPressed" @focus="focusChanged" @blur="blur" :value="getValueString" ref="amount" />
    <div class="display" @click="displayClicked">
      Gegeben
      <span>€{{getDisplayString}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component'
import AmountInput from './AmountInput.vue'

@Options({
  name: 'PaidAmountInput'
})
export default class PaidAmountInput extends AmountInput {
  protected emitter: any
  protected name = 'PaidAmountInput'
  protected storeValueName = 'getGivenValueString'
  protected storeConcatFunctionName = 'concatGivenValueString'
  protected storeDeleteLastFunctionName = 'deleteLastGivenValueString'
  protected hasFocus = false

  mounted () : void {
    this.emitter.on('DisplayFocusChanged', (e:any) => {
      if (e === 'PaidAmountInput') {
        this.hasFocus = true
      } else {
        this.hasFocus = false
      }
    })
    this.emitter.on('changeFocusToPaidAmountInput', () => {
      this.$refs.amount.focus()
    })
  }

  focusChanged (): void {
    super.focusChanged()
    this.hasFocus = true
    this.emitter.emit('DisplayFocusChanged', 'PaidAmountInput')
  }
}
</script>
