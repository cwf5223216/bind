// pages/classic/classic.js
import {
    ClassicModel
} from '../../models/classic.js'
import {
    LikeModel
} from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        //setData会把数据放到data中以完成数据更新，所以我们先声明calssic,方便我们看清楚组件、页面中我们所使用的数据
        classic: null,
        //因为我们使用getLatest方法获得的数据就是最新一期，所以我们就可以默认first为true，而latest为false
        first: false,
        latest: true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //getLatest是异步函数所以不可以直接return
        classicModel.getLatest((res) => {
            console.log(res)
            //使用setData完成数据绑定
            this.setData({
                classic: res
            })
        })
    },
    //这个onLike是实现向服务器传递你到底点击的是喜欢还是不喜欢
    onLike: function(event) {
        /*console.log(event)*/
        let behavior = event.detail.behavior
        likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
    },

    onNext: function(event) {
        this._updateClassic('next')
    },

    onPrevious: function(event) {
        this._updateClassic('previous')
    },

    _updateClassic: function(nextOrPrevious) {
        let index = this.data.classic.index
        classicModel.getClassic(index, nextOrPrevious, (res) => {
            this.setData({
                classic: res,
                latest: classicModel.isLatest(res.index),
                first: classicModel.isFirst(res.index)
            })
        })
    },
    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})