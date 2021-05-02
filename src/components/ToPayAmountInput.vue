<template>
  <div v-bind:class="{ focus: hasFocus }">
    <input type="number" @keyup="keyPressed" @focus="focusChanged" @blur="blur" :value="getValueString" ref="amount" />
    <div class="display" @click="displayClicked">
      Zu zahlen
      <span>€{{getDisplayString}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component'
import AmountInput from './AmountInput.vue'

@Options({
  name: 'ToPayAmountInput'
})
export default class ToPayAmountInput extends AmountInput {
  protected emitter: any
  protected name = 'ToPayAmountInput'
  protected storeValueName = 'getToPayValueString'
  protected storeConcatFunctionName = 'concatToPayValueString'
  protected storeDeleteLastFunctionName = 'deleteLastToPayValueString'
  protected hasFocus = true

  mounted () : void {
    this.$store.commit('currentFocusAmountInput', this)
    this.$refs.amount.focus()
    this.emitter.on('DisplayFocusChanged', (e:any) => {
      if (e === 'ToPayAmountInput') {
        this.hasFocus = true
      } else {
        this.hasFocus = false
      }
    })
    this.emitter.on('changeFocusToToPayAmountInput', () => {
      console.log('event received changeFocusToToPayAmountInput')
      // this.focusChanged()
      this.$refs.amount.focus()
    })
  }

  focusChanged (): void {
    super.focusChanged()
    this.hasFocus = true
    this.emitter.emit('DisplayFocusChanged', 'ToPayAmountInput')
  }
}
</script>
