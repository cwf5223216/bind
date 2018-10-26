// components/book/index.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /*组件的属性列表*/
    properties: {
        /* ... */
        book:Object
    },
    /*组建的初始数据*/
    data: {
        //MVVM数据绑定
        
    },
    /*组件的方法*/
    methods: {

        onTop:function(event){
            const bid = this.properties.book.id
            //跳转路径
            wx.navigateTo({
                url: `/pages/book-detail/book-detail?bid=${bid}`
            })
        }
        
    }
})