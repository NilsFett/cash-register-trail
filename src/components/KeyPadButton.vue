<template>
  <button @click="keyPressed"><span>{{keyValue?keyValue:'&nbsp;'}}</span></button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'KeyPadButton',
  props: {
    keyValue: String
  }
})
export default class KeyPadButton extends Vue {
  private keyValue! :string

  keyPressed (): void {
    console.log(this.keyValue)
    if (this.keyValue === '') {
    } else if (this.keyValue === 'del') {
      this.$store.commit(this.$store.getters.getCurrentFocusAmountInput.storeDeleteLastFunctionName)
    } else {
      console.log(this.$store.getters.getCurrentFocusAmountInput)
      const currentValue = this.$store.getters[this.$store.getters.getCurrentFocusAmountInput.storeValueName]
      console.log(currentValue)
      if (parseInt(`${currentValue}${this.keyValue}`) <= 100000) {
        this.$store.commit(this.$store.getters.getCurrentFocusAmountInput.storeConcatFunctionName, this.keyValue)
      }
    }
  }
}
</script>
