
import { Controller } from 'egg';
// import HttpExceptions from '../middleware/http_exceptions'
export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    //const names = ctx.query.name;
    // if (!names) {
    //   throw new HttpExceptions('服务器异常', 1001, 400)
    // }
    ctx.body = await ctx.service.test.sayHi('egg');

  }
}
