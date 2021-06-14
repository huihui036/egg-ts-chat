import { ParameterError } from '../interface/interface';
class HttpExceptions extends Error {
  public code: number;
  public msg: string;
  public httpCode: number;
  public data: any[];
  constructor(msg = '服务器出错误了', code = 1, httpCode = 400, data?) {
    super();
    this.code = code;
    this.msg = msg;
    this.httpCode = httpCode;
    this.data = data;
  }
}

class HttpParameterExceptions extends Error {
  public code: string;
  public msg: ParameterError[];
  public field: string;
  constructor(message = [], code = 'invalid', field = '') {
    super();
    this.code = code;
    this.msg = message;
    this.field = field;
  }
}


export { HttpExceptions, HttpParameterExceptions };
