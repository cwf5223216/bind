import {HTTP} from '../util/http.js'

class ClassicModel extends HTTP {
    getLatest(sCallback) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
                //这里需要使用回调函数(必须)
                sCallback(res)
                this._setLatestIndex(res.index)
            }
        })
    }
    /*获得期刊*/
    getClassic(index, nextOrPrevious, sCallback) {
        //从缓存中取得数据 然后再存入缓存
        //key 确定可KEY
        this.request({
            //url es6 语法eq url:`calssic/${index}/${nextOrPrevious}`
            url: 'classic/' + index + '/' + nextOrPrevious,
            success: (res) => {
               sCallback(res)
            }
        })
       
    }
    /*是否为第一期*/
    isFirst(index) {
        return index == 1 ? true : false
    }
    /*是否为最后一期*/
    isLatest(index) {
        let latestIndex = this._getLatestIndex()
        return latestIndex == index ? true : false
    }
    /*设置最后一期*/
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }
    /*得到最后一期*/
    _getLatestIndex() {
        let index = wx.getStorageSync('latest')
        return index
    }
}
export {ClassicModel}