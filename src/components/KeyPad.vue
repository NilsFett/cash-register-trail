<template>
  <div class="keypad">
    <KeyPadButton v-for="padKey in padKeys" :key="padKey" v-bind:key-value="padKey" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import KeyPadButton from './KeyPadButton.vue'

@Options({
  name: 'ToPayAmountInput',
  components: {
    KeyPadButton
  }
})
export default class KeyPad extends Vue {
  private padKeys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'del', '0', '']

  get getPadKeys (): string[] {
    return this.padKeys
  }
}
</script>
