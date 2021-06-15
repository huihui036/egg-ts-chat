export interface ErrorData {
  status: number;
  requestUrl: string;
  msg: string | ParameterError[];
  code: number;
  httpCode: number;
  errsInfo: string
  data?: any[]
}
export interface ParameterError {
  message: string;
  code: string;
  field: string
}


export interface Regiter {
  name: string,
  avatar?: string,
  checkCode: string
  password: string,
  password2: string,
  email: string,
}

export interface RegiterDb {
  id?: string,
  name: string,
  account: string,
  avatar?: string,
  password: string,
  email: string,
  state: number
}
export interface Logibn {
  email: string,
  password: string
}


export interface checkCode {
  email: string,
  codeType: number,
  code: string
}


export interface recetPasswrd {
  email: string,
  new_password: string,
  check_code: string
}
