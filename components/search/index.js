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
        hotWords:[],
        dataArray:[],
        searching:false,
        q:''
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
        //关闭搜索
        onCancel(event) {
            //监听事件函数，第一个参数事件名
            this.triggerEvent('cancel', {}, {})
        },
        //搜索
        onConfirm(event) {
            //为什么不在回调函数中使用，因为用户体验，当用户敲击回车时，我们就给他反应，隐藏
            this.setData({
                searching:true
            })
            //加入缓存
            // const word = event.detail.value
            // keyworldModel.addToHistory(word)
            //监听后去服务器请求数据
            const q = event.detail.value || event.detail.text
            keyworldModel.search(0,q).then(res=>{
                this.setData({
                    dataArray:res.books,
                    q:q
                    /*searching:true*/
                })
                //修改后，当服务器返回数据后，我们认为用户输入的字段是正确的，有返回结果，我们才把它写入到缓存中
                console.log(this.data.dataArray)
                keyworldModel.addToHistory(q)
            })

        },
        //清空搜索
        onDelete(event){
            this.setData({
                searching:false,
                dataArray:[],
                q:''
            })
            console.log(this.data.dataArray,this.data.q)   
        }
        
    }
})