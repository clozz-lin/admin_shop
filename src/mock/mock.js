import Mock from 'mockjs'

Mock.mock('/menus', 'get', {
  data: [
    {
      id: 125,
      authName: '用户管理',
      path: '',
      children: [
        {
          id: 104,
          authName: '用户列表',
          path: 'users',
          children: []
        }
      ]
    },
    {
      id: 103,
      authName: '权限管理',
      path: null,
      children: [
        {
          id: 104,
          authName: '角色列表',
          path: 'roles',
          children: []
        },
        {
          id: 104,
          authName: '权限列表',
          path: 'rights',
          children: []
        }
      ]
    },
    {
      id: 101,
      authName: '商品管理',
      path: null,
      children: [
        {
          id: 104,
          authName: '商品列表',
          path: 'goods',
          children: []
        },
        {
          id: 104,
          authName: '分类参数',
          path: 'params',
          children: []
        },
        {
          id: 104,
          authName: '商品分类',
          path: 'categories',
          children: []
        }
      ]
    },
    {
      id: 102,
      authName: '订单管理',
      path: '',
      children: [
        {
          id: 104,
          authName: '订单列表',
          path: 'orders',
          children: []
        }
      ]
    },
    {
      id: 145,
      authName: '数据统计',
      path: null,
      children: [
        {
          id: 104,
          authName: '数据报表',
          path: 'reports',
          children: []
        }
      ]
    }
  ],
  meta: {
    msg: '获取菜单列表成功',
    status: 200
  }
})

Mock.mock('/users', 'get', {
  data: {
    total: 5,
    pagenum: 4,
    'users|5-12': [
      {
        id: '@cname(1)',
        username: '@cword(2,5)',
        mobile: '18616358651',
        type: 1,
        email: '@email()',
        create_time: '2017-11-09T20:36:26.000Z',
        mg_state: true, // 当前用户的状态
        role_name: '超级管理员'
      }
    ]
  },
  meta: {
    msg: '获取成功',
    status: 200
  }
})

Mock.mock('/roles', 'get', {
  'data|5-10': [
    {
      id: 30,
      roleName: '@cword(2,5)',
      roleDesc: '技术负责人',
      children: [
        {
          id: 101,
          authName: '商品管理',
          path: null,
          children: [
            {
              id: 104,
              authName: '商品列表',
              path: null,
              children: [
                {
                  id: 105,
                  authName: '添加商品',
                  path: null
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  meta: {
    msg: '获取成功',
    status: 200
  }
})

Mock.mock('/rights/list', 'get', {
  'data|10-12': [
    {
      id: 101,
      authName: '@cword(2,5)',
      level: '0',
      pid: 0,
      path: null
    }
  ],
  meta: {
    msg: '获取权限列表成功',
    status: 200
  }
})

Mock.mock('/categories', 'get', {
  data: [
    {
      cat_id: 1,
      cat_name: '大家电',
      cat_pid: 0,
      cat_level: 0,
      cat_deleted: false,
      children: [
        {
          cat_id: 3,
          cat_name: '电视',
          cat_pid: 1,
          cat_level: 1,
          cat_deleted: false,
          children: [
            {
              cat_id: 6,
              cat_name: '曲面电视',
              cat_pid: 3,
              cat_level: 2,
              cat_deleted: false
            },
            {
              cat_id: 7,
              cat_name: '海信',
              cat_pid: 3,
              cat_level: 2,
              cat_deleted: false
            }
          ]
        }
      ]
    }
  ],
  meta: {
    msg: '获取成功',
    status: 200
  }
})

Mock.mock('/login', 'post', {
  data: {},
  meta: {
    status: 200
  }
})
