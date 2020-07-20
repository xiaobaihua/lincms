/* eslint-disable class-methods-use-this */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Task {
  // constructor() {
  async getAllUser() {
    const res = await get(`v1/task/user/list`)
    return res
  }

  async createTaskType(data) {
    return _axios({
      method: 'Post',
      url: 'v1/task/type/add',
      data,
    })
  }

  async searchCheckTaskList(data) {
    return _axios({
      method: 'Post',
      url: 'v1/task/check/search',
      data,
    })
  }
  async editTaskType(id, info) {
    const res = await put(`v1/task/rule/${id}`, info)
    return res
  }

  async getTaskTypeList() {
    const res = await get(`v1/task/rule/list`)
    return res
  }

  async getTaskTypeByID(id) {
    const res = await get(`v1/task/rule/${id}`)
    return res
  }
  async getAnswersByTaskIDs(data) {
    return _axios({
      method: 'Post',
      url: 'v1/ans/list',
      data,
    })
  }

  async deleteTask(id) {
    const res = await _delete(`v1/task/${id}`)
    return res
  }

  async deleteTaskType(id) {
    const res = await _delete(`v1/task/rule/${id}`)
    return res
  }

  // 获取任务
  async getTaskTypListVO() {
    const res = await get(`/v1/task/type`)
    return res
  }

  async drawTaskByTaskType(typeid, userid) {
    return _axios({
      method: 'post',
      url: 'v1/task/type/getTask',
      data: {
        type_id: typeid,
        user_id: userid,
      },
    })
  }

  async getCheckTaskList(stateID) {
    const res = await get(`v1/task/check/${stateID}`)
    return res
  }
  async getCheckTaskByID(id) {
    const res = await get(`v1/task/check/one/${id}`)
    return res
  }

  // 类中的方法可以代表一个用户行为
  async putCheckTask(data, statueID) {
    // console.log(statueID)
    const res = await put(`v1/task/check/${statueID}`, data)
    return res
    // return _axios({
    //   method: 'put',
    //   url: 'v1/task/check/${statueID}',
    //   data,
    // })
  }

  async getTaskBillList(date, typeID, userID) {
    return _axios({
      method: 'post',
      url: 'v1/task/getBillList',
      data: {
        date1: date[0],
        date2: date[1],
        typeID: typeID,
        userID: userID,
      },
    })
  }

  async getTaskByDate(date, typeID, userID) {
    // console.log(statueID)
    return _axios({
      method: 'post',
      url: 'v1/task/getTasksByDateType',
      data: {
        date1: date[0],
        date2: date[1],
        typeID: typeID,
        userID: userID,
      },
    })
    // return _axios({
    //   method: 'put',
    //   url: 'v1/task/check/${statueID}',
    //   data,
    // })
  }

  // 类中的方法可以代表一个用户行为
  async createTask(data) {
    return _axios({
      method: 'post',
      url: 'v1/task',
      data,
    })
  }

  async createAnswer(data) {
    return _axios({
      method: 'post',
      url: 'v1/task/addAnswer',
      data,
    })
  }

  // 添加任务至用户列表
  async addUserTaskList(data) {
    return _axios({
      method: 'Post',
      url: 'v1/task/addUserTaskLst',
      data,
    })
  }

  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象
  async getTask(id) {
    const res = await get(`v1/task/${id}`)
    return res
  }

  async getTaskAllStatus() {
    const res = await get(`v1/task/status`)
    return res
  }

  async getAllTaskRule() {
    const res = await get(`v1/task/rule`)
    return res
  }

  async getTaskListByStatus(statusID) {
    if (!statusID) {
      // 0默认查询所有
      statusID = 0
    }
    const res = await get(`v1/task/status/${statusID}`)
    return res
  }

  async getTaskListByUserID(userID, data) {
    if (!userID) {
      // 0默认查询所有
      userID = 0
    }
    const res = await get(`v1/task/user/${userID}`, data)
    return res
  }

  async editTask(id, info) {
    const res = await put(`v1/task/${id}`, info)
    return res
  }

  async delectTask(id) {
    const res = await _delete(`v1/task/${id}`)
    return res
  }

  async getTasks() {
    return _axios({
      method: 'get',
      url: 'v1/task/0',
      handleError: true,
    })
  }
}

export default new Task()
