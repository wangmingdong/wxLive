Page({
  data: {
    // 播放状态
    isPlay: false,
    // 音量状态
    openVoice: true,
    // 视频状态日志
    videoLog: '',
    // 全屏状态
    isScreen: false
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
  // 恢复
  bindResume() {
    this.ctx.resume({
      success: res => {
        console.log('resume success')
        this.setData({ openVoice: true });
      },
      fail: res => {
        console.log('resume fail')
      }
    })
  },
  // 音量
  bindMute() {
    this.ctx.mute({
      success: res => {
        console.log('mute success')
        this.setData({ openVoice: false });
      },
      fail: res => {
        console.log('mute fail')
      }
    })
  },
  // 全屏
  bindScreen(event) {
    if (event.currentTarget.dataset.variable) {
      this.ctx.requestFullScreen({
        success: res => {
          this.setData({ isScreen: true });
        },
        fail: res => {
          console.log('screen fail')
        }
      })
    } else {
      this.ctx.exitFullScreen({
        success: res => {
          this.setData({ isScreen: false });
        },
        fail: res => {
          console.log('screen fail')
        }
      })
    }
  }
})