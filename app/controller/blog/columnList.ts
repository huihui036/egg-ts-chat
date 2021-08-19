/*
 * @Author: qingHui
 * @Date: 2021-06-15 09:34:41
 * @LastEditors: XuQinghui
 * @LastEditTime: 2021-08-19 21:02:04
 * @Description: 
 */
import { pageSeizeSech } from 'app/interface/blog';
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
    let queys: string = ctx.url
    console.log(ctx.url)
    const queryCheck = queys.indexOf("?")
    let newest: pageSeizeSech = {
      curettage: 2,
      pagesize: 10
    }
    if (queryCheck) {
      let getPage = queys.replace('?', '&')
      let pageData = parse(getPage)
      newest.curettage = +(pageData as pageSeizeSech).curettage || 1
      newest.pagesize = +(pageData as pageSeizeSech).pagesize || 1
    }

    ctx.body = await ctx.service.blog.column.getConus(newest)

  }
  /**
        * @summary 根据id获取专题
        * @description 专题内容
        * @router get /column/{id}
        * @request path string *id 
        * @response 200 postsList 成功
        */
  public async columnists() {
    const { ctx } = this;
    let paramsId = this.ctx.params
    // TODO 验证id 是否为objectID
    console.log(paramsId.id)
    ctx.body = await ctx.service.blog.column.getCountOne(paramsId.id);
  }
}