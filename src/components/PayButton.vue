<template>
  <div>
    <button @click="clicked"><span>Zahlen</span></button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'PayButton'
})
export default class KeyPad extends Vue {
  private clicked () {
    this.$store.commit('showCashbackModal')
  }
}
</script>
