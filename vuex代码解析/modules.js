import {
  fetchGet,
  fetchPost
} from '@/api'
import * as storage from '@/utils/storage'
import * as crypto from '@/utils/crypto'
import {
  CSMSKEY
} from '@/config'


function hasAccess() {
  return storage.get(CSMSKEY.Access) ? true : false
}

function getToken() {
  return storage.get(CSMSKEY.Token)
}

const user = {
  state: {
    admin: {},
    access: [],
    roles: []
  },
  mutations: {
    SET_ADMIN: (state, admin) => {
      state.admin = admin
    },
    SET_ACCESS: (state, access) => {
      state.access = access
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    // 用户名登录
    LoginByName({
      commit
    }, form) {
      return new Promise((resolve, reject) => {
        fetchPost('/sys/user/login', form).then(response => {
          const user = response.data.data
          if(user){
            const roles = []
            roles.push(user.rolename)

            //local storage
            storage.set(CSMSKEY.Token, user.token)
            storage.set(CSMSKEY.User, crypto.encrypt(user))

            //注意：这里暂时不设置roles,需要获取admin的权限菜单  
            commit('SET_ADMIN', user)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出
    LoginOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        fetchPost('/sys/user/loginout', {
          token: getToken()
        }).then(response => {
          commit('SET_ADMIN', {})
          commit('SET_ROLES', [])
          commit('SET_ACCESS', [])

          storage.clear()

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录管理员
    getAdmin({
      commit,
      state
    }) {
      // 页面刷新 state都会丢失，需要重新获取登录信息
      return new Promise((resolve, reject) => {
        const user = JSON.parse(crypto.decrypt(storage.get(CSMSKEY.User)))

        let result = {
          roles: [],
          access: []
        }

        if (hasAccess()) {
          result.access = JSON.parse(crypto.decrypt(storage.get(CSMSKEY.Access)))
          result.roles.push(user.rolename)

          commit('SET_ADMIN', user)
          commit('SET_ROLES', result.roles)
          commit('SET_ACCESS', result.access)

          resolve(result)
        } else {

          fetchGet('/sys/rule/menus?', {
            rid: user.roleId
          }).then(response => {
            const res = response.data.data
            result.access = res.rows
            result.roles.push(user.rolename)

            // local storage
            storage.set(CSMSKEY.Access, crypto.encrypt(res.rows))

            commit('SET_ADMIN', user)
            commit('SET_ROLES', result.roles)
            commit('SET_ACCESS', result.access)

            resolve(result)
          }).catch(error => {
            reject(error)
          })
        }
      })
    }
  },
  getters: {
    test: state => state.access
  }
}

export default user
