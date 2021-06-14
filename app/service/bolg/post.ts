import { HttpExceptions } from '../../middleware/http_exceptions';
import { Service } from 'egg'
import { pageSzieSsech } from 'app/interface/bolg';

export default class extends Service {
  public async getPopstByColunmId(id: string, newstr: pageSzieSsech) {
    console.log(id)
    const findPost = await this.app.model.Posts.find({ 'column': id }).limit(newstr.pagesize).skip((newstr.currentpage - 1) * newstr.pagesize);
    if (!findPost) {
      throw new HttpExceptions('未查询到专题结果', 10004, 200);
    }
    throw new HttpExceptions('成功', 10004, 200, findPost);
  }
}