import { requestByoto } from '@/network/request'

export function Getotodata(url, method, queryparam) {
    return requestByoto({
        //   url: '/wxa/GetWxaWebClsItemList',
        url: url,
        method: method,
        data: queryparam,
    })
}