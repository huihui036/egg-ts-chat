import { HttpExceptions, HttpParameterExceptions } from './http_exceptions'
import { ErrorData } from "../interface/interface";

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      // ctx.app.emit('error', err, ctx);
      let status = 500;
      let error: ErrorData = {
        status: 0,
        requestUrl: "/",
        msg: "this is error",
        code: 0,
        httpCode: 0,
        errsInfo: '',
        data: []
      };

      if (err instanceof HttpExceptions) {
        status = err.httpCode
        error.requestUrl = `${ctx.method} : ${ctx.path}`;
        error.msg = err.msg;
        error.code = err.code;
        error.httpCode = err.httpCode;
        error.data = err.data
      } else if (err instanceof HttpParameterExceptions) {
        status = 401
        error.requestUrl = `${ctx.method} : ${ctx.path}`;
        error.msg = err.msg;
        error.code = 4001;
        error.httpCode = 401;
      } else {
        // 未知异常，系统异常，线上不显示堆栈信息
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        console.log('err', err)
        error.requestUrl = `${ctx.method} : ${ctx.path}`;
        error.httpCode = 500
        error.msg = status === 500 && ctx.app.config.env === 'prod'
          ? 'Internal Server Error'
          : err.message;
      }
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = error;

      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    }
  };
};