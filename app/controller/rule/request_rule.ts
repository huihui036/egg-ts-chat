// 获取邮箱参数
const getEmailCodeRule = {
  userName: {
    type: 'email',
  },
  codeType: [1000, 1001, 1002],

};
// 注册参数
const regitertRule = {
  email: {
    type: 'email',
  },
  name: {
    type: 'string',
    max: 18,
    min: 6,
  },
  checkCode: {
    type: 'string',
    max: 6,
    min: 6,
  },
  password: {
    type: 'password',
    allowEmpty: false,
  },
  password2: {
    type: 'password',
    allowEmpty: false,
  },
};
// 登入参数
const loginRule = {
  email: {
    type: 'email',
  },
  password: {
    type: 'password',
    allowEmpty: false,
  },
};

export { getEmailCodeRule, regitertRule, loginRule }