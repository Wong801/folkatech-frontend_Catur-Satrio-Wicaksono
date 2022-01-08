import axios from "axios"

const baseUrl = 'https://techtest.folkatech.com/api'

const product = {
  state: () => ({
    list: [],
    total: 0,
    detail: null
  }),
  mutations: {
    setList(state, payload) {
      state.list = payload
    },
    setDetail(state, payload) {
      state.detail = payload
    }
  },
  actions: {
    async getProductList({ commit, rootState }, params) {
      try {
        const { data } = await axios.get(`${baseUrl}/product`, { 
          params,
          headers: {
            Authorization: `Bearer ${rootState.user.token}`
          }
        })
        commit('setList', data.data.list)
        commit('setDetail', data.data.total)
      } catch (error) {
        throw error.response.message
      }
    },
    async getProductDetail({ commit }, params) {
      try {
        const { data } = await axios.post(`${baseUrl}/product`, { params })
        commit('setList', data.data.list[0])
        return data.message
      } catch (error) {
        throw error.response.message
      }
    }
  }
}

export default product