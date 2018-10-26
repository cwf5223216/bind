import { HTTP } from '../util/http-p.js'

class BookModel extends HTTP{
  //书籍列表
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }
  //看书人数
  getMyCount(bid) {
    return this.request({
      url: 'book/favor/count'
    })
  }
  //书籍详情
  getDetail(bid){
    return this.request({
      url:`book/${bid}/detail`
    })
  }

  //书籍喜欢状态
  getLikeStatus(bid){
    return this.request({
      url:`book/${bid}/favor`
    })
  }

  //书籍详情
  getComment(bid){
    return this.request({
      url:`book/${bid}/short_comment`
    })
  }
  

  
}

export {BookModel}