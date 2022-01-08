import axios from "axios"

const baseUrl = 'https://techtest.folkatech.com/api'

const user = {
  state: () => ({
    token: '',
    userData: null
  }),
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserData(state, payload) {
      if(payload.token) delete payload.token
      state.userData = payload
    }
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const { data } = await axios.post(`${baseUrl}/login`, payload)
        const token = data.data.token
        commit('setToken', token)
        commit('setUserData', data.data)
        return token
      } catch (error) {
        throw error.response.message
      }
    },
    async register({ commit }, payload) {
      try {
        const { data } = await axios.post(`${baseUrl}/register`, payload)
        return data.message
      } catch (error) {
        throw error.response.message
      }
    }
  }
}

export default user