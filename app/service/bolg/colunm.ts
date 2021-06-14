import { HttpExceptions } from '../../middleware/http_exceptions';
import { Service } from 'egg';
import { pageSzieSsech } from 'app/interface/bolg';
/**
 * Test Service
 */
export default class Colunm extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */

  public async getCounm(newstr: pageSzieSsech) {

    const creatUser = await this.app.model.Colunm.find().limit(newstr.pagesize).skip((newstr.currentpage - 1) * newstr.pagesize);
    if (!creatUser) {
      throw new HttpExceptions('未查询到专题结果', 10004, 200);
    }
    throw new HttpExceptions('成功', 10004, 200, creatUser);
  }
  public async getCounmOne(id: string) {
    const findCounmOne = await this.app.model.Colunm.find({ '_id': id })
    console.log(findCounmOne, id)
    throw new HttpExceptions('成功', 10004, 200, findCounmOne);
  }
}