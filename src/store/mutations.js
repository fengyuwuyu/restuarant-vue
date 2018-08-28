export default {
  changeDiningroom (state, item) {
    state.diningroom = item
    try {
      localStorage.diningroom = JSON.stringify(item)
    } catch (e) {
      console.log(e)
    }
  },
  changeDiningroomList (state, diningroomList) {
    state.diningroomList = diningroomList
    try {
      localStorage.diningroomList = JSON.stringify(diningroomList)
    } catch (e) {
      console.log(e)
    }
  }
}
