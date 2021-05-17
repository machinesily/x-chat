import request from './request'

export function login(params) {
  return request({
    url: '/login',
    method: 'get',
    params
  })
}