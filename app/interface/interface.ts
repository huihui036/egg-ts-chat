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
  userName: string,
  avatar?: string,
  checkCode?: string
  password: string,
  confirmPassword: string,
  email: string,
}

export interface RegiterDb {
  id?: string,
  userName: string,
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
