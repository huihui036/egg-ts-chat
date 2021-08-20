/*
 * @Author: qingHui
 * @Date: 2021-04-16 14:19:03
 * @LastEditors: qingHui
 * @LastEditTime: 2021-08-20 14:57:58
 * @Description:
 */
import { HttpExceptions, HttpParameterExceptions } from './http_exceptions'
import { ErrorData } from '../interface/interface'

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next()
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      // ctx.app.emit('error', err, ctx);
      let status = 500
      let error: ErrorData = {
        requestUrl: '/',
        msg: 'this is error',
        statusCode: 0,
        errsInfo: '',
        data: [],
      }

      if (err instanceof HttpExceptions) {
        status = err.httpCode
        error.requestUrl = `${ctx.method} : ${ctx.path}`
        error.msg = err.msg
        error.statusCode = err.code
        // error.httpCode = err.httpCode;
        error.data = err.data
      } else if (err instanceof HttpParameterExceptions) {
        status = 401
        error.requestUrl = `${ctx.method} : ${ctx.path}`
        error.msg = err.msg
        error.statusCode = 4001
        error.errsInfo = err.errsInfo
     
      } else {
        let newErr = err as Error
        if ((newErr.name = 'JsonWebTokenError')) {
          status = 401
          error.requestUrl = `${ctx.method} : ${ctx.path}`
          // error.httpCode =400
          error.msg = 'token 错误'
        } else if (newErr.name == 'TokenExpiredError') {
          status = 401
          error.requestUrl = `${ctx.method} : ${ctx.path}`
          //error.httpCode =400
          error.msg = 'token 已过期'
        } else {
          error.requestUrl = `${ctx.method} : ${ctx.path}`
          //  error.httpCode = 500
          error.msg =
            status === 500 && ctx.app.config.env === 'prod'
              ? 'Internal Server Error'
              : (err as Error).message
        }

        // 未知异常，系统异常，线上不显示堆栈信息
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      }
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = error

      ctx.status = status
    }
  }
}
