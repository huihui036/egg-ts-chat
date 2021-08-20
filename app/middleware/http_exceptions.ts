/*
 * @Author: qingHui
 * @Date: 2021-04-16 14:19:03
 * @LastEditors: qingHui
 * @LastEditTime: 2021-08-20 15:54:25
 * @Description: 
 */
import { ParameterError } from '../interface/interface';
class HttpExceptions extends Error {
  public code: number;
  public msg: string;
  public httpCode: number;
  public data: any[];
  public errsInfo: string | any[]
  constructor(msg = '服务器出错误了', code = 1, httpCode = 500, data?,errsInfo?) {
    super();
    this.code = code;
    this.msg = msg;
    this.httpCode = httpCode;
    this.data = data;
    this.errsInfo = errsInfo;
  }
}

class HttpParameterExceptions extends Error {
  public code: number;
  public msg: string;
  public field: string;
  public errsInfo: ParameterError[]
  constructor(code = 400,errsInfo) {
    super();
    this.code = code;
    this.msg = '参数错误';
    this.errsInfo = errsInfo;
  }
}


export { HttpExceptions, HttpParameterExceptions };
