import {
    HTTP
} from '../util/http-p.js'
class KeyworldModel extends HTTP {
    key = 'q'
    maxLength = 10
    //获取历史
    getHistory() {
        let words = wx.getStorageSync(this.key)
        if (!words) {
            return []
        }
        return words
    }
    //获取最新
    getHot() {
        return this.request({
            url: '/book/hot_keyword'
        })
    }
    //加入缓存
    addToHistory(keyword) {
        let words = this.getHistory()
        //判断是否存在
        const has = words.includes(keyword)
        //队列
        if (!has) {
            const length = words.length
            if (length >= this.maxLength) {
                //删除末尾元素
                words.pop()
            }
            //添加到元素首位
            words.unshift(keyword)
            //存入缓存
            wx.setStorageSync(this.key, words)
        }
    }
    //搜索
    search(start, q) {
        return this.request({
            url: '/book/search?summary=1',
            data: {
                q: q,
                start: start
            }
        })
    }
}
export {
    KeyworldModel
}