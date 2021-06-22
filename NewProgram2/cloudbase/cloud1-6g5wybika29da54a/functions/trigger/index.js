// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: 'cloud1-6g5wybika29da54a' })
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    try {
      return await db.collection('userInfos').where({
        attentionTimeToday: _.gt(0)
      })
      .update({
        data: {
          attentionTimeToday: 0
        },
        success: function(res) {
          console.log(res.data)
        }
      })
    } catch(e) {
      console.error(e)
    }
}