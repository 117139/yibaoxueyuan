//app.js
App({
	IPurl1: 'https://sf.zgylbx.com/index.php',
	IPurl2: 'https://sf.zgylbx.com',
  platforms:'',
  onLaunch: function () {
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('token')
		 this.dlogin()
    // 获取用户信息
    this.platforms = wx.getSystemInfoSync()

    console.log(this.platforms.platform)
  },
  onShow: function(){
    var that =this
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
        console.log("session_key 未过期，并且在本生命周期一直有效")
        that.dlogin()
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        console.log("session_key 已经失效")
        that.dlogin() // 重新登录
       

        
      }
    })
  },
  globalData: {
    userInfo: null
  },
  dlogin(supid){
		var that =this
		var uinfo
		wx.getSetting({
		  success: res => {
		    // console.log(res)
		    if (res.authSetting['scope.userInfo']==true) {
		      wx.getUserInfo({
		        success: res => {
		          that.globalData.userInfo = res.userInfo
              uinfo = res.userInfo
              wx.setStorageSync('userInfo', res.userInfo)
              wx.login({
                success: function (res) {
                  if (res.code) {
                    that.getuser(res.code, uinfo.nickName, uinfo.avatarUrl, supid)
                   
                    return
                    var appid = "wxd1034622dbcffc48"        //appid
                    var secret = "16410179a711eb886766c86694b4699d"    //密钥
                    
                  } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                  }
                }
              })
		        }
		      })
		    }else{
		    }
		  }
		})
		
	},
  getuser(code, nickname, tx, supid,type){
		let that =this
    var geturl1
    if (supid){
      console.log('supid:'+supid)
      geturl1 = that.IPurl1 + '?m=content&c=index&a=wechat&code=' + code + '&nickname=' + nickname + '&touxiang=' + tx +'&pid='+supid
    }else{
      geturl1 = that.IPurl1 + '?m=content&c=index&a=wechat&code=' + code + '&nickname=' + nickname + '&touxiang=' + tx

    }
    // console.log(geturl1)
			wx.request({
				//http://sf.zgylbx.com/index.php?m=content&c=index&a=lists&catid=12
				url: geturl1,
				data:{},
				header: {
					'content-type': 'application/x-www-form-urlencoded' 
				},
				dataType:'json',
				method:'POST',
				success(res) {
					
          // console.log('openid126' + JSON.stringify(res))
					// console.log(res.data)
					wx.setStorageSync('usermsg', res.data)
          console.log('login')
          // that.onload()
          if (type =='shouquan'){
            wx.navigateBack()
          }
          setTimeout(function () {
            if (getCurrentPages().length != 0) {
              getCurrentPages()[getCurrentPages().length - 1].onLoad()
            }
            
          }, 0)
          // console.log(131 + JSON.stringify(wx.getStorageSync('usermsg')))
					// that.setData({
					// 	imgUrls:res.data
					// })
					
					// pageState1.finish()    // 切换为finish状态
				},
				fail(err) {
          console.log(err)
          console.log(JSON.stringify(err))
					 // pageState1.error()    // 切换为error状态
					 // wx.hideLoading()
				}
			})
		
	},
  gotel(){
    var that = this
    //http://sf.zgylbx.com/index.php?m=content&c=index&a=shizhi&uid=4
    wx.request({
      url: that.IPurl2 + '/index.php?m=content&c=index&a=shizhi&uid=' + wx.getStorageSync('usermsg').userid,
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        console.log(res.data)
        if (res.data.zt == 0) {
            wx.navigateTo({
              url: '/pages/bdtel/bdtel?url='+res.data.img,
            })
        } else if(res.data.zt == 1) {
          wx.navigateTo({
            url: '/pages/hqewm/hqewm?url='+res.data.zhifu,
          })
        } else {
          if (res.data.msg) {
            wx.showToast({
              icon: 'none',
              title: '获取失败'
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '获取失败'
            })
          }
        }

      },
      fail(err) {
        wx.showToast({
          icon: 'none',
          title: '操作失败'
        })
        console.log(err)
      }
    })
  },
  gomore(e,catid,id) {
    console.log(e)
    wx.navigateTo({
      url: "/pages/pinglun/pinglun?catid=" + catid+"&id="+id
    })
  },
})