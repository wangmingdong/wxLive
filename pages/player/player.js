Page({
  data: {
    // 播放状态
    isPlay: false,
    // 视频状态日志
    videoLog: ''
  },
  onReady(res) {
    this.ctx = wx.createLivePlayerContext('player')
  },
  statechange(e) {
    console.log('live-player code:', e.detail.code)
    console.log('live-player code===>:', e.detail)
    if ([2001, 2002, 2007].indexOf(e.detail.code) > -1) {
      this.setData({ videoLog: e.detail.message });
    }
    if (e.detail.code == 2004) {
      this.setData({ isPlay: true });
      this.setData({ videoLog: '' });
    }
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },
  // 播放
  bindPlay() {
    this.ctx.play({
      success: res => {
        this.setData({ isPlay: true })
        console.log('play success')
      },
      fail: res => {
        console.log('play fail')
        this.setData({ isPlay: false })
      }
    })
  },
  bindPause() {
    this.ctx.pause({
      success: res => {
        this.setData({ isPlay: false })
        console.log('pause success')
      },
      fail: res => {
        this.setData({ isPlay: true })
        console.log('pause fail')
      }
    })
  },
  bindStop() {
    this.ctx.stop({
      success: res => {
        console.log('stop success')
        this.setData({ isPlay: false });
      },
      fail: res => {
        console.log('stop fail')
      }
    })
  },
  bindResume() {
    this.ctx.resume({
      success: res => {
        console.log('resume success')
      },
      fail: res => {
        console.log('resume fail')
      }
    })
  },
  bindMute() {
    this.ctx.mute({
      success: res => {
        console.log('mute success')
      },
      fail: res => {
        console.log('mute fail')
      }
    })
  }
})