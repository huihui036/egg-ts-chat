const emailCode = {
  email: {
    type: 'email',
  },
  codeType: [1000, 1001, 1002],
};

const regitertRule = {
  email: {
    type: 'email',
  },
  userName: {
    type: "string",
  },
  checkCode: {
    required: false,
    type: "string",
  },
  password: {
    type: "password",
    allowEmpty: false
  },
  confirmPassword: {
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
const recetPasswrdRule = {
  email: {
    type: 'email',
  },
  new_password: {
    type: "password",
    allowEmpty: false
  },
  check_code: {
    type: "string",
    max: 6,
    min: 6,
  },
}


export { emailCode, regitertRule, loginRule, recetPasswrdRule }