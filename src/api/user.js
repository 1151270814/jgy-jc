import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/doLogin',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/sysUser/getSysUserByUsername',
    method: 'get', 
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
