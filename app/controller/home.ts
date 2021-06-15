
import { Controller } from 'egg';
// import HttpExceptions from '../middleware/http_exceptions'
/**
 * @Controller 测试
 */
export default class HomeController extends Controller {
  /**
      * @summary 接口测试
      * @description 测试swagger文档是否可用
      * @router get /
      * @request query string str 随机字符串
      * @response 200 testResponse
      */
  public async index() {
    const { ctx } = this;

    ctx.body = await ctx.service.test.sayHi('egg');

  }
}
