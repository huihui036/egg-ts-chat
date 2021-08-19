/*
 * @Author: qingHui
 * @Date: 2021-06-15 09:34:41
 * @LastEditors: XuQinghui
 * @LastEditTime: 2021-08-19 21:02:19
 * @Description: 
 */
import { HttpExceptions } from '../../middleware/http_exceptions';
import { Service } from 'egg';
import { pageSeizeSech } from 'app/interface/blog';
/**
 * Test Service
 */
export default class Column extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */

  public async getConus(newts: pageSeizeSech) {
    console.log("123")
    const creatUser = await this.app.model.Column.find().limit(newts.pagesize).skip((newts.curettage - 1) * newts.pagesize);
    if (!creatUser || creatUser.length <= 0) {
      throw new HttpExceptions('未查询到专题结果', 10004, 400);
    }
    throw new HttpExceptions('成功', 10004, 200, creatUser);
  }
  public async getCountOne(id: string) {
    const findCountOne = await this.app.model.Column.find({ '_id': id })
    console.log(findCountOne, id)
    throw new HttpExceptions('成功', 10004, 200, findCountOne);
  }
}