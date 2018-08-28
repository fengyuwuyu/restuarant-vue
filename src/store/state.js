import CommonUtil from '../utils/commmonUtil'
let defaultDiningroom = {}
let defaultDiningroomList = []
try {
  if (localStorage.diningroom) {
    defaultDiningroom = CommonUtil.parseJson(localStorage.diningroom)
  }
  if (localStorage.diningroomList) {
    defaultDiningroomList = CommonUtil.parseJson(localStorage.diningroomList)
  }
} catch (e) {}

export default {
  diningroom: defaultDiningroom,
  diningroomList: defaultDiningroomList
}
