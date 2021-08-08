Page({
  data: {
    input: '',
    todos: [],
    todos2: [],
    //用来计算未完成任务数量
    leftCount: 0,
    rightCount: 0,
    allCompleted: false,
    allCompleted2: false,
    // logs: [],
    src1: "../../images2/r2.png",
    src2: "../../images2/c4.png",
    height: "",
    actionIndex: 0,
    buttonshow: false
  },

  changeType: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      actionIndex: index,
    })
    if (this.data.actionIndex == 0) {
      this.todo1()
      // console.log("00000000000")
    } else {
      this.todo2()
      // console.log("222222")
    }
  },

  click: function () {
    this.addTodoHandle()
  },

  save: function () {
    if (this.data.actionIndex == 0) {
      wx.setStorageSync('todo_list', this.data.todos)
    } else {
      wx.setStorageSync('todo_list2', this.data.todos2)
    }
    // wx.setStorageSync('todo_logs', this.data.logs)
  },

  todo1: function () {
    var todos = wx.getStorageSync('todo_list')
    if (todos) {
      var leftCount = todos.filter(function (item) {
        return !item.completed
      }).length
      this.setData({ todos: todos, leftCount: leftCount ,buttonshow: false})
    }
  },

  todo2: function () {
    var todos2 = wx.getStorageSync('todo_list2')
    if (todos2) {
      var rightCount = todos2.filter(function (item) {
        return !item.completed
      }).length
      this.setData({ todos2: todos2, rightCount: rightCount ,buttonshow: true})
    }
  },

  onShow: function () {
    var todos = wx.getStorageSync('todo_list')
    if (todos) {
      var leftCount = todos.filter(function (item) {
        return !item.completed
      }).length
      this.setData({ todos: todos, leftCount: leftCount })
    }
    // console.log("111111")
    var Height = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: Height * 0.66
    })
  },

  inputChangeHandle: function (e) {
    this.setData({ input: e.detail.value })
  },

  addTodoHandle: function (e) {
    if (!this.data.input || !this.data.input.trim()) return
    if (this.data.actionIndex == 0) {
      var todos = this.data.todos
      todos.unshift({ name: this.data.input, completed: false })
      // var logs = this.data.logs
      // logs.unshift({ timestamp: new Date(), action: 'Add', name: this.data.input })
      this.setData({
        input: '',
        todos: todos,
        leftCount: this.data.leftCount + 1,
        // logs: logs
      })
    } else {
      var todos2 = this.data.todos2
      todos2.unshift({ name: this.data.input, completed: false })
      // var logs = this.data.logs
      // logs.unshift({ timestamp: new Date(), action: 'Add', name: this.data.input })
      this.setData({
        input: '',
        todos2: todos2,
        rightCount: this.data.rightCount + 1,
        // logs: logs
      })
    }
    this.save()
  },

  toggleTodoHandle: function (e) {
    var index = e.currentTarget.dataset.index
    if (this.data.actionIndex == 0) {
      var todos = this.data.todos
      todos[index].completed = !todos[index].completed
      this.setData({
        todos: todos,
        leftCount: this.data.leftCount + (todos[index].completed ? -1 : 1),
        // logs: logs
      })
    } else {
      var todos2 = this.data.todos2
      todos2[index].completed = !todos2[index].completed
      this.setData({
        todos2: todos2,
        rightCount: this.data.rightCount + (todos2[index].completed ? -1 : 1),
        // logs: logs
      })
    }

    // var logs = this.data.logs
    // logs.push({
    //   timestamp: new Date(),
    //   action: todos[index].completed ? 'Finish' : 'Restart',
    //   name: todos[index].name
    // })
    this.save()
  },

  removeTodoHandle: function (e) {
    var index = e.currentTarget.dataset.index
    if (this.data.actionIndex == 0) {
      var todos = this.data.todos
      var remove = todos.splice(index, 1)[0]
      this.setData({
        todos: todos,
        leftCount: this.data.leftCount - (remove.completed ? 0 : 1),
        // logs: logs
      })
    } else {
      var todos2 = this.data.todos2
      var remove = todos2.splice(index, 1)[0]
      this.setData({
        todos2: todos2,
        rightCount: this.data.rightCount - (remove.completed ? 0 : 1),
        // logs: logs
      })
    }

    // var logs = this.data.logs
    // logs.push({ timestamp: new Date(), action: 'Remove', name: remove.name })

    this.save()
  },

  toggleAllHandle: function (e) {
    if (this.data.actionIndex == 0) {
      this.data.allCompleted = !this.data.allCompleted
      var todos = this.data.todos
      for (var i = todos.length - 1; i >= 0; i--) {
        todos[i].completed = this.data.allCompleted
      }
      this.setData({
        todos: todos,
        leftCount: this.data.allCompleted ? 0 : todos.length,
        // logs: logs
      })
    } else {
      this.data.allCompleted2 = !this.data.allCompleted2
      var todos2 = this.data.todos2
      for (var i = todos2.length - 1; i >= 0; i--) {
        todos2[i].completed = this.data.allCompleted2
      }
      this.setData({
        todos2: todos2,
        rightCount: this.data.allCompleted2 ? 0 : todos2.length,
        // logs: logs
      })
    }

    // var logs = this.data.logs
    // logs.push({
    //   timestamp: new Date(),
    //   action: this.data.allCompleted ? 'Finish' : 'Restart',
    //   name: 'All todos'
    // })

    this.save()
  },

  clearCompletedHandle: function (e) {
    if (this.data.actionIndex == 0) {
      var todos = this.data.todos
      var remains = []
      for (var i = 0; i < todos.length; i++) {
        todos[i].completed || remains.push(todos[i])
      }
      this.setData({
        todos: remains,
        // logs: logs
      })
    } else {
      var todos2 = this.data.todos2
      var remains = []
      for (var i = 0; i < todos2.length; i++) {
        todos2[i].completed || remains.push(todos2[i])
      }
      this.setData({
        todos2: remains,
        // logs: logs
      })
    }

    // var logs = this.data.logs
    // logs.push({
    //   timestamp: new Date(),
    //   action: 'Clear',
    //   name: 'Completed todo'
    // })
    this.save()
  }
})
