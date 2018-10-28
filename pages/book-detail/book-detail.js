// pages/book-detail/book-detail.js
import {
    BookModel
} from '../../models/book.js'
const bookModel = new BookModel()
import {LikeModel} from '../../models/like.js'
const likeModel = new LikeModel()


Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    comments:[],
    book:null,
    likeStatus:false,
    likeCount:0,
    posting:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bid = options.bid
    const detail = bookModel.getDetail(bid).then(res=>{
      this.setData({
          book:res
      })
      console.log(res)
    })

    const comments = bookModel.getComment(bid).then(res=>{
      this.setData({
          comments:res.comments
      })
      console.log(res)
    })

    const likeStatus = bookModel.getLikeStatus(bid).then(res=>{
      this.setData({
          likeStatus:res.like_status,
          likeCount:res.fav_nums
      })
      console.log(res)
    })

  },
  
  onLike:function (event)
  {
    console.log(event)
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.book.id,400)
  },
  onFakePost:function(event){
     this.setData({
       posting:true
     })
     console.log(this.data.posting)
  },
  onCancel:function(event){
    this.setData({
      posting:false
    })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})