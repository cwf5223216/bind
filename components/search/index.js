// components/search/index.js
//妈的，给我好好看看类名，别他妈又写错了，找半天找不到
import {
    KeyworldModel
} from '../../models/keyword.js'
const keyworldModel = new KeyworldModel()
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /*组件的属性列表*/
    properties: {
        /* ... */
    },
    /*组建的初始数据*/
    data: {
        //MVVM数据绑定
        historyWords:[],
        hotWords:[]
    },
    attached: function () { 
        const historyWords = keyworldModel.getHistory()
        const hotWords = keyworldModel.getHot()
        this.setData({
            historyWords:historyWords
        })

        hotWords.then(res=>{
            this.setData({
                hotWords:res.hot
            })
        })
    }, 

    /*组件的方法*/
    methods: {
        onCancel(event) {
            //监听事件函数，第一个参数事件名
            this.triggerEvent('cancel', {}, {})
        },
        onConfirm(event) {
            const word = event.detail.value
            keyworldModel.addToHistory(word)
        }
    }
})