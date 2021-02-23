import { request, requestByoto } from '@/network/request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function GetHomeGoodsListdata(queryparam) {
  return requestByoto({
    url: '/wxa/GetWxaWebClsItemList',
    method: 'post',
    data: queryparam,
  })
}