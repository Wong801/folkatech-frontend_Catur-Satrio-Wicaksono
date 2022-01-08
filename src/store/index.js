import { createStore } from 'vuex'
import user from './modules/api/user'
import product from './modules/api/product'

export default createStore({
  modules: {
    user,
    product
  }
})
