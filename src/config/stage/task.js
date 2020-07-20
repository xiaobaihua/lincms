const bookRouter = {
  route: null,
  name: null,
  title: '任务管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/task/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '任务总计',
      type: 'view',
      name: 'taskTotal',
      route: '/task/taskTotal',
      // filePath: 'view/book/book-list.vue',
      filePath: 'view/task/TaskTotal.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '全部任务',
      type: 'view',
      name: 'TaskList',
      route: '/task/list',
      permission: ['新建任务', '编辑任务', '删除任务', '修改任务'],
      // filePath: 'view/book/book-create.vue',
      filePath: 'view/task/TaskList.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '添加任务',
      type: 'view',
      name: 'TaskAdd',
      permission: ['新建任务', '编辑任务', '删除任务', '修改任务'],
      route: '/task/add',
      // filePath: 'view/book/book-list.vue',
      filePath: 'view/task/TaskAdd.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '领取任务',
      type: 'view',
      name: 'getTask',
      permission: ['领取题目'],
      route: '/task/getTask',
      // filePath: 'view/book/book-list.vue',
      filePath: 'view/task/GetTask.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '我的任务',
      type: 'view',
      name: 'doTask',
      permission: ['提交答案'],
      route: '/task/doTask',
      // filePath: 'view/book/book-list.vue',
      filePath: 'view/task/DoTask.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      route: null,
      name: null,
      title: '任务类型',
      type: 'folder', // 类型: folder, tab, view
      icon: 'iconfont icon-tushuguanli',
      filePath: 'view/task/taskType', // 文件路径
      order: null,
      inNav: true,
      permission: ['任务类型'],
      children: [
        {
          title: '添加类型',
          type: 'view',
          name: 'TaskTypeList',
          route: '/task/rule/add',
          // filePath: 'view/book/book-create.vue',
          filePath: 'view/task/taskType/TaskTypeAdd.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
        {
          title: '所有类型',
          type: 'view',
          name: 'TaskTypeList',
          route: '/task/rule/list',
          // filePath: 'view/book/book-create.vue',
          filePath: 'view/task/taskType/TaskTypeList.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
      ],
    },
    {
      route: null,
      name: null,
      title: '结算中心',
      type: 'folder', // 类型: folder, tab, view
      filePath: 'view/task/taskBill', // 文件路径
      order: null,
      inNav: true,
      permission: ['结算中心'],
      children: [
        {
          title: '结算中心',
          type: 'view',
          name: 'TaskBillList',
          route: '/task/bill/list',
          filePath: 'view/task/taskBill/TaskBillList.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
      ],
    },
    {
      route: null,
      name: null,
      title: '审核中心',
      type: 'folder', // 类型: folder, tab, view
      icon: 'iconfont icon-tushuguanli',
      filePath: 'view/task/taskCheck', // 文件路径
      order: null,
      inNav: true,
      permission: ['任务审核'],
      children: [
        {
          title: '审核中心',
          type: 'view',
          name: 'taskCheckList',
          route: '/task/check/list',
          // filePath: 'view/book/book-create.vue',
          filePath: 'view/task/taskCheck/TaskCheckList.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
      ],
    },
  ],
}

export default bookRouter
