import { requestByoto } from '@/network/request'

export function Getotodata(url, method, queryparam) {
    return requestByoto({
        //   url: '/wxa/GetWxaWebClsItemList',
        url: url,
        method: method,
        data: queryparam,
    })
}

export class GoodsPrc {
    constructor(data) {
        this.oto_prc = data.oto_prc;
        this.in_prc = data.in_prc;
        this.vip_prc = data.vip_prc;
    }
}

export class itemdesc {
    constructor(data) {
        this.itemname = data.item_name;
        this.itemsize = data.item_size;
        this.unitname = data.unit_name;
        this.isfavorites = data.isfavorites;
        this.browsecnt = data.browse_cnt;
    }
}