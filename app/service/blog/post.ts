/*
 * @Author: qingHui
 * @Date: 2021-06-15 09:34:41
 * @LastEditors: XuQinghui
 * @LastEditTime: 2021-08-19 20:49:07
 * @Description: 
 */
import { HttpExceptions } from '../../middleware/http_exceptions';
import { Service } from 'egg'
import { pageSeizeSech } from 'app/interface/blog';

export default class extends Service {
  public async getPostByColumnId(id: string, newest: pageSeizeSech,) {
    console.log(id)
    const findPost = await this.app.model.Posts.find({ 'column': id }).limit(newest.pagesize).skip((newest.curettage - 1) * newest.pagesize);
    if (!findPost || findPost.length <= 0) {
      throw new HttpExceptions('未查询到专题结果', 10004, 200);
    }
    throw new HttpExceptions('成功', 10004, 200, findPost);
  }
}