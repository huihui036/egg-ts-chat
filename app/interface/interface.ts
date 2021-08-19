/*
 * @Author: qingHui
 * @Date: 2021-04-16 14:19:03
 * @LastEditors: qingHui
 * @LastEditTime: 2021-08-19 14:23:50
 * @Description: 
 */
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


export interface Register {
  name: string,
  avatar?: string,
  checkCode: string
  password: string,
  password2: string,
  email: string,
}

export interface RegisterDb {
  id?: string,
  name: string,
  account: string,
  avatar?: string,
  password: string,
  email: string,
  state: number
}
export interface Logion {
  email: string,
  password: string
}


export interface checkCode {
  email: string,
  codeType: number,
  code: string
}


export interface resetPassword {
  email: string,
  newPassword: string,
  checkCode: string
}
