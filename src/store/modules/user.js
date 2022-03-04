import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {//commit：同步操作，数据提交至 mutations ，可用于读取用户信息写到缓存里this.$store.commit('loginStatus', 1);
  RESET_STATE: (state) => { //reset_state
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {//set_token
    state.token = token
  },
  SET_NAME: (state, username) => { //set_name
    state.name = username
  },
  SET_AVATAR: (state, userImage) => {//set_avatar
    state.avatar = userImage
  }
}

const actions = {//dispatch：含有异步操作，数据提交至 actions ，可用于向后台提交数据this.$store.dispatch('isLogin', true);
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      
      login({ username: username.trim(), password: password }).then(response => {

        console.log(response, "--------------------")

        const { token } = response
       
        commit('SET_TOKEN', token)//ste_token
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })

  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        
        const  data = response
        if (!data) {
          return reject('验证失败，请重新登录.')
        }
        // debugger
        const { username, userImage } = data

        commit('SET_NAME', username)//set_name
        commit('SET_AVATAR', userImage)//set_avatar
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')//reset_state
        // resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')//reset_state
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

