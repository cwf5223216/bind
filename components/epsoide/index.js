// components/epsoide/index.js
// components/like/index.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /*组件的属性列表*/
    properties: {
        /* 期刊号 */
        index: {
            type: String,
            observer: function(newVal, oldVal, changedPath) {
                // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
                // 通常 newVal 就是新设置的数据， oldVal 是旧数据
                /*当index数据类型为number时，这样处理不行，因为小程序会自动转化。而string类型又因为会无限递归，而报错所以我们在data中定义一个新的_index
                数据给他赋值，注意使用_index时，你组件的{{}}中调用的也必须时{{_index}}而不是{{index}}*/
                let val = newVal <10?'0'+newVal:newVal
                this.setData({
                  _index:val
                })
                console.log(newVal)
                console.log(oldVal)
            }
        }
    },
    /*组建的初始数据*/
    data: {
        //MVVM数据绑定
        months:[
        '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'
        ],
        year: 0,
        month: '',
        //处理index
        _index:''
    },

     attached: function () {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()

      this.setData({
        year:year,
        month:this.data.months[month]
      })
     },
    //验证data中默认值设置
    /*attached:function(){
     console.log(this.properties.index)
     console.log(this.data.year)
     console.log(this.data.month)
    },*/
    /*组件的方法*/
    methods: {}
})