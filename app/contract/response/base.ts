'use strict';

module.exports = {
  // 测试模块
  testResponse: {
    message: { type: 'string' }
  },
  // 文章列表
  postsList: {
    postsList: { type: 'string' }
  },
  columnList: {
    columnList: { type: 'string' }
  },
  userData: {
    name: { type: 'string' }
  },
  emailCode: {
    code: { type: 'number' },
    msg: { type: 'string' },
    requestUrl: { type: 'string' }
  },
  createUserGetEamil: {
    // userName: { type: 'string', required: true, description: '用户姓名' },
    // sexy: { type: 'string', required: true, enum: ['male', 'female'], description: '用户性别' },
    // age: { type: 'integer', required: true, min: 1, description: '年龄' },
    // group: { type: 'integer', required: true, min: 1, description: '组别' },
    // isLeader: { type: 'boolean', required: true, description: '是否小组负责人' },
    email: { type: 'string', required: false, example: '1315574336@qq.com', format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, description: '邮箱' },
    codeType: { type: 'number', required: false, enum: [1000, 1001, 1002], example: 1000, description: '验证码类型' },
  },

  createUser: {
    email: { type: 'string', required: false, example: '1315574336@qq.com', format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, description: '邮箱' },
    userName: { type: 'string', required: true, description: '用户姓名' },
    checkCode: { type: 'string', required: true, description: '验证码' },
    password: { type: 'string', required: true, description: '密码' },
    password2: { type: 'string', required: true, description: '再次输入' },
  },

  LoginUser: {
    email: { type: 'string', required: false, example: '1315574336@qq.com', format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, description: '邮箱' },
    password: { type: 'string', required: true, description: '密码' },
  },
  recetpPassword: {
    email: { type: 'string', required: false, example: '1315574336@qq.com', format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, description: '邮箱' },
    new_password: { type: 'string', required: true, description: '密码' },
    check_code: { type: 'string', required: true, description: '验证码' },
  }

};