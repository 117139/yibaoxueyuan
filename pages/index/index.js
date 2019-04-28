//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
		
		
		
		arr:[
		'/static/images/btn2_1.jpg',
		'/static/images/btn2_2.jpg',
		'/static/images/btn2_3.jpg',
		'/static/images/btn2_4.jpg',
		'/static/images/btn2_5.jpg',
		'/static/images/btn2_6.png',
		]
  },
  onLoad: function (option) {
		wx.showLoading()
		if(option.supid){
			console.log("index31-option:"+option.supid)
		}
    /*if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }*/
  },
	onReady:function (){
		wx.hideLoading()
	},
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
	 formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  jump(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/magazineDatails/magazineDatails?id=' + id
    })
  }
})
