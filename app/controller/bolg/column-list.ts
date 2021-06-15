import { pageSzieSsech } from 'app/interface/bolg';
import { Controller } from 'egg';
import { parse } from 'querystringify'
// import HttpExceptions from '../middleware/http_exceptions'
/**
 * @Controller 专题
 */
export default class Column extends Controller {

  /**
     * @summary 获取专题列表
     * @description 专题列表
     * @router get /column
     * @request query string currentpage 页数
     * @request query string pagesize 每页少条
     * @response 200 postsList 成功
     */
  public async columnList() {
    const { ctx } = this;
    let querys: string = ctx.url
    const querysCheck = querys.indexOf("?")
    let newstr: pageSzieSsech = {
      currentpage: 2,
      pagesize: 10
    }
    if (querysCheck) {
      let getPage = querys.replace('?', '&')
      let pageData = parse(getPage)
      newstr.currentpage = +(pageData as pageSzieSsech).currentpage || 1
      newstr.pagesize = +(pageData as pageSzieSsech).pagesize || 1
    }

    ctx.body = await ctx.service.bolg.colunm.getCounm(newstr)

  }
  /**
        * @summary 根据id获取专题
        * @description 专题内容
        * @router get /column/{id}
        * @request path string *id 
        * @response 200 postsList 成功
        */
  public async columndata() {
    const { ctx } = this;
    let paramsId = this.ctx.params
    // TODO 验证id 是否为objecID
    console.log(paramsId.id)
    ctx.body = await ctx.service.bolg.colunm.getCounmOne(paramsId.id);
  }
}