import request from './request'

export function register(params) {
  return request({
    url: '/register',
    method: 'get',
    params
  })
}

export function countUser(params) {
  return request({
    url: '/countUser',
    method: 'get',
    params
  })
}