<script lang="ts">
import { Vue } from 'vue-class-component'

export default class AmountInput extends Vue {
  protected emitter: any
  protected name = 'ToPayAmountInput'
  protected storeValueName = 'getToPayValueString'
  protected storeConcatFunctionName = 'concatToPayValueString'
  protected storeDeleteLastFunctionName = 'deleteLast'
  protected hasFocus = false

  $refs!: {
    amount: HTMLFormElement
  }

  keyPressed (event:KeyboardEvent): void {
    if ((event.keyCode >= 48 && event.keyCode <= 58) || (event.keyCode >= 96 && event.keyCode <= 105)) {
      if (parseInt(`${this.$store.getters[this.storeValueName]}${event.key}`) <= 100000) {
        this.$store.commit(this.storeConcatFunctionName, event.key)
      } else {
        this.$refs.amount.value = this.$store.getters[this.storeValueName]
      }
    } else if (event.keyCode === 8) {
      this.$store.commit(this.storeDeleteLastFunctionName)
    } else if (event.keyCode === 13 && this.name === 'ToPayAmountInput') {
      this.emitter.emit('changeFocusToPaidAmountInput')
    } else {
      this.$refs.amount.value = this.$store.getters[this.storeValueName]
    }
    event.preventDefault()
  }

  focusChanged (): void {
    this.$store.commit('currentFocusAmountInput', this)
  }

  displayClicked (): void {
    this.$refs.amount.focus()
  }

  get getValueString (): string {
    return this.$store.getters[this.storeValueName]
  }

  get getDisplayFocusName (): string {
    return this.$store.getters.getDisplayFocusName
  }

  get getDisplayString (): string {
    let displayString = this.$store.getters[this.storeValueName]
    while (displayString.length < 4) {
      displayString = `0${displayString}`
    }
    const commaInsertPos = displayString.length - 2
    return [displayString.slice(0, commaInsertPos), ',', displayString.slice(commaInsertPos)].join('')
  }
}
</script>
