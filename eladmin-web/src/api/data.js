import request from '@/utils/request'
import qs from 'qs'

export function initData(url, params) {
  return request({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
}

export function download(url, params) {
  return request({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get',
    responseType: 'blob'
  })
}

export function getOpenId() {
  return request({
    url: 'http://36x1717t00.qicp.vip',
    method: 'get'
  })
}
