<template>
  <div class="displays">
    <ToPayInput />
    <PaidInput />
  </div>
  <div class="interface">
    <div class="layout-helper">&nbsp;</div>
    <ForecastButtons />
    <KeyPad />
    <PayButton />
  </div>
  <cashback-modal />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ToPayInput from './components/ToPayAmountInput.vue'
import PaidInput from './components/PaidAmountInput.vue'
import ForecastButtons from './components/ForecastButtons.vue'
import KeyPad from './components/KeyPad.vue'
import PayButton from './components/PayButton.vue'
import CashbackModal from './components/CashbackModal.vue'

@Options({
  components: {
    ToPayInput,
    PaidInput,
    ForecastButtons,
    KeyPad,
    PayButton,
    CashbackModal
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
}
body{
  font-family: sans-serif;
  background-color: #e5e5e5;
}
button{
  color: #fff;
  border: 0px;
  padding:5px;
  background-color: #3f504a;
  width:120px;
  height:60px;
  span{
    display:block;
    height:100%;
    width:100%;
    background-color: #657076;
    padding:2px;
    cursor:pointer;
    line-height:45px;
  }
}
.interface{
  background-color: #3f504a;
  position:absolute;
  bottom:0px;
  width:100%;
  display: flex;
  div{
    width:25%;
    padding:10px;
  }
  .forecast-buttons{
    button{
      display: block;
      width:100%;
      height:50px;
      span{
        line-height:35px;
      }
    }
  }
  .keypad{
    button{
      width:33.33%;
      font-size: 2.5em;
    }
  }
}
.displays{
  input{
    position:absolute;
    left:-10000px;
  }
  width: 100%;
  max-width: 800px;
  color: #2a2a2a;
  margin: 50px auto;
  .display{
    width: 100%;
    background-color: #fff;
    margin-top:5px;
    span{
      text-align: center;
      font-size: 2.5em;
      width: 100%;
      display:block;
    }
  }
  .focus{
    .display{
      span{
        text-decoration: underline;
      }
    }
  }
}

.chashback-modal{
  display: none;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: rgba(100,100,100,0.5);
  .alignment-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    button{
      display: block;
      margin: 0 auto;
    }
  }
}
.chashback-modal.visible{
  display: block;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
