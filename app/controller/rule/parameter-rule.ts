/*
 * @Author: qingHui
 * @Date: 2021-06-15 09:34:41
 * @LastEditors: qingHui
 * @LastEditTime: 2021-08-19 14:22:50
 * @Description: 
 */
const emailCode = {
  email: {
    type: 'email',
  },
  codeType: [1000, 1001, 1002],

};

const registersRule = {
  email: {
    type: 'email',
  },
  userName: {
    type: "string",
  },
  checkCode: {
    type: "string",
    max: 6,
    min: 6,
  },
  password: {
    type: "password",
    allowEmpty: false
  },
  password2: {
    type: "password",
    allowEmpty: false
  }
}
const loginRule = {
  email: {
    type: 'email',
  },
  password: {
    type: "password",
    allowEmpty: false
  },
}
const rectPasswordRule = {
  email: {
    type: 'email',
  },
  newPassword: {
    type: "password",
    allowEmpty: false
  },
  checkCode: {
    type: "string",
    max: 6,
    min: 6,
  },
}


export { emailCode, registersRule, loginRule, rectPasswordRule  }