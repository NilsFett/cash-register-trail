import { createStore } from 'vuex'

export default createStore({
  state: {
    toPayValueString: '',
    givenValueString: '',
    currentFocusAmountInput: {},
    showCashbackModal: false
  },
  getters: {
    getToPayValueString: state => {
      return state.toPayValueString
    },
    getGivenValueString: state => {
      return state.givenValueString
    },
    getCurrentFocusAmountInput: state => {
      return state.currentFocusAmountInput
    },
    getShowCashbackModal: state => {
      return state.showCashbackModal
    }
  },
  mutations: {
    concatToPayValueString (state, char) {
      state.toPayValueString = `${state.toPayValueString}${char}`
    },
    deleteLastToPayValueString (state) {
      state.toPayValueString = state.toPayValueString.slice(0, -1)
    },
    concatGivenValueString (state, char) {
      state.givenValueString = `${state.givenValueString}${char}`
    },
    changeGivenValueString (state, newValue) {
      state.givenValueString = `${newValue}`
    },
    deleteLastGivenValueString (state) {
      state.givenValueString = state.givenValueString.slice(0, -1)
    },
    currentFocusAmountInput (state, amountInputComponent) {
      state.currentFocusAmountInput = amountInputComponent
    },
    showCashbackModal (state) {
      state.showCashbackModal = true
    },
    closeCashbackModal (state) {
      state.showCashbackModal = false
      state.toPayValueString = ''
      state.givenValueString = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
