export interface ErrorData {
  status: number;
  requestUrl: string;
  msg: string | ParameterError[];
  code: number;
  httpCode: number;
  errsInfo: number
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
  name: string,
  account: string,
  avatar?: string,
  password: string,
  email: string,
  state: number
}

export interface checkCode {
  user: string,
  codeType: number,
  code: string
}
