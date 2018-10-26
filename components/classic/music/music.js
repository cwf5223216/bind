// components/classic/music/music.js
import {
    classicBehavior
} from '../classic-beh.js'
const mMgr = wx.getBackgroundAudioManager()
Component({
    /**
     * 组件的属性列表,动画，动画API CSS3 canvas
     */
    behaviors: [classicBehavior],
    properties: {
        src: String,
        title: String
    },
    /**
     * 组件的初始数据
     */
    data: {
        playing: false,
        pauseSrc: 'images/player@pause.png',
        playSrc: 'images/player@play.png'
    },
    attached: function(event) {
        /*this._recoverPlaying()
        this._monitorSwitch()*/
        //只能在wx:if中
        this._recoverStatus()
        this._monitorSwitch()
    },
    detached: function() {
        // wx.pauseBackgroundAudio()
        // mMgr.stop()
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onPlay: function(event) {
            if (!this.data.playing) {
                this.setData({
                    playing: true
                })
                mMgr.src = this.properties.src
            } else {
                this.setData({
                    playing: false
                })
                mMgr.pause()
            }
        },
        _recoverStatus: function(event) {
            if (mMgr.paused) {
                this.setData({
                    playing: false
                })
                return
            }
            if (mMgr.src == this.properties.src) {
                this.setData({
                    playing: true
                })
            }
        },
        //播放器检测,
        _monitorSwitch: function() {
            mMgr.onPlay(() => {
                this._recoverStatus()
            })
            mMgr.onPause(() => {
                this._recoverStatus()
            })
            mMgr.onStop(() => {
                this._recoverStatus()
            })
            mMgr.onEnded(() => {
                this._recoverStatus()
            })
        }
    }
})