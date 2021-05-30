const emailCode = {
  email: {
    type: 'email',
  },
  code_type: [1000, 1001, 1002],

};

const regitertRule = {
  email: {
    type: 'email',
  },
  name: {
    type: "string",
  },
  chek_code: {
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