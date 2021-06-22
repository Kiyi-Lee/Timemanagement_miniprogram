// pages/tap2/tap2.js
var that;

Page({
  data: {
    show: false,
    duration: 300,
    position: 'right',
    round: true,
    overlay: true,
    customStyle: '',
    overlayStyle: '',
    mHidden: true,
    // show: false,
    content: '',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
    content_html: '',
    content_html1: '',
    content_html2: '',
    content_html3: '',
    content_html4: '',
    placeholder: '开始输入...',
    isReadOnly: false,
    node1: [{
      name: 'div1',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: '暂无数据'
      }]
    }],
    nodes2: [{
      name: 'div2',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: '暂无数据'
      }]
    }],
    nodes3: [{
      name: 'div3',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: '暂无数据'
      }]
    }],
    nodes4: [{
      name: 'div4',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: '暂无数据'
      }]
    }],
  },

  btnTap: function () {
    this.setData({
      show: true,
    })
  },

  exit() {
    this.setData({ show: false })
  },

  onShow() {
    that = this;
  },
  onEditorReady1() {
    // 输入~编辑框
    wx.createSelectorQuery().select('#editor1').context(function (res) {
      that.editorCtx = res.context;
      var test = wx.getStorageSync("content") || []
      // console.log("初始化成功：" + wx.getStorageSync("content1")+test[0].content1)
      if (wx.getStorageSync("content")) { // 设置~历史值
        that.editorCtx.insertText(test[0].content1) // 注意：插入的是对象
      }
    }).exec()
  },
  onEditorReady2() {
    // 输入~编辑框
    // wx.createSelectorQuery().select('#editor2').context(function (res) {
    //   that.editorCtx = res.context;
    //   var test = wx.getStorageSync("content") || []
    //   console.log("初始化成功：" + wx.getStorageSync("content2")+test[0].content2)
    //   if (wx.getStorageSync("content")) { // 设置~历史值
    //     that.editorCtx.insertText(wx.getStorageSync(test[0].content2)) // 注意：插入的是对象
    //   }
    // }).exec()
        // 输入~编辑框
        wx.createSelectorQuery().select('#editor2').context(function (res) {
          that.editorCtx = res.context;
          var test = wx.getStorageSync("content") || []
          // console.log("初始化成功：" + wx.getStorageSync("content")+test[0].content2)
          if (wx.getStorageSync("content")) { // 设置~历史值
            that.editorCtx.insertText(test[0].content2) // 注意：插入的是对象
          }
        }).exec()
  },
  onEditorReady3() {
    // 输入~编辑框
    // wx.createSelectorQuery().select('#editor3').context(function (res) {
    //   that.editorCtx = res.context;
    //   // console.log("初始化成功：" + wx.getStorageSync("content3"))
    //   if (wx.getStorageSync("content3")) { // 设置~历史值
    //     that.editorCtx.insertText(wx.getStorageSync("content3")) // 注意：插入的是对象
    //   }
    // }).exec()
    wx.createSelectorQuery().select('#editor3').context(function (res) {
      that.editorCtx = res.context;
      var test = wx.getStorageSync("content") || []
      // console.log("初始化成功：" + wx.getStorageSync("content")+test[0].content3)
      if (wx.getStorageSync("content")) { // 设置~历史值
        that.editorCtx.insertText(test[0].content3) // 注意：插入的是对象
      }
    }).exec()
  },
  onEditorReady4() {
    // 输入~编辑框
    // wx.createSelectorQuery().select('#editor4').context(function (res) {
    //   that.editorCtx = res.context;
    //   // console.log("初始化成功：" + wx.getStorageSync("content4"))
    //   if (wx.getStorageSync("content4")) { // 设置~历史值
    //     that.editorCtx.insertText(wx.getStorageSync("content4")) // 注意：插入的是对象
    //   }
    // }).exec()
    wx.createSelectorQuery().select('#editor4').context(function (res) {
      that.editorCtx = res.context;
      var test = wx.getStorageSync("content") || []
      // console.log("初始化成功：" + wx.getStorageSync("content")+test[0].content4)
      if (wx.getStorageSync("content")) { // 设置~历史值
        that.editorCtx.insertText(test[0].content4) // 注意：插入的是对象
      }
    }).exec()
  },
  // 获取内容
  onContentChange1(e) {
    var test
    test = test || []
    test.unshift({
      content1 : e.detail,
      content2 : this.data.content2,
      content3 : this.data.content3,
      content4 : this.data.content4
    })
    that.setData({
      content1: e.detail,
      content: test
    })
    wx.setStorageSync("content", test)
  },
  onContentChange2(e) {
    var test
    test = test || []
    test.unshift({
      content1 : this.data.content1,
      content2 : e.detail,
      content3 : this.data.content3,
      content4 : this.data.content4
    })
    that.setData({
      content2: e.detail,
      content: test
    })
    wx.setStorageSync("content", test)
    // that.setData({
    //   content2: e.detail,
    // })
    // wx.setStorageSync("content2", e.detail)
  },
  onContentChange3(e) {
    // that.setData({
    //   content3: e.detail,
    // })
    // wx.setStorageSync("content3", e.detail)
    var test
    test = test || []
    test.unshift({
      content1 : this.data.content1,
      content2 : this.data.content2,
      content3 : e.detail,
      content4 : this.data.content4
    })
    that.setData({
      content3: e.detail,
      content: test
    })
    wx.setStorageSync("content", test)
  },
  onContentChange4(e) {
    // that.setData({
    //   content4: e.detail,
    // })
    // wx.setStorageSync("content4", e.detail)
    var test
    test = test || []
    test.unshift({
      content1 : this.data.content1,
      content2 : this.data.content2,
      content3 : this.data.content3,
      content4 : e.detail
    })
    that.setData({
      content4: e.detail,
      content: test
    })
    wx.setStorageSync("content", test)
  },
  return() {
    // console.log("返回1级页面------");
    wx.navigateBack({
      delta: 0,
    })
  },
  close: function () {
    this.setData({ show: false })
  },

})