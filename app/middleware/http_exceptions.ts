import { ParameterError } from '../interface/interface';
class HttpExceptions extends Error {
  public code: number;
  public msg: string;
  public httpCode: number;
  constructor(msg = '服务器异常', code = 1, httpCode = 400) {
    super();
    this.code = code;
    this.msg = msg;
    this.httpCode = httpCode;
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
