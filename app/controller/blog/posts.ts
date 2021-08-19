/*
 * @Author: qingHui
 * @Date: 2021-06-15 09:34:41
 * @LastEditors: XuQinghui
 * @LastEditTime: 2021-08-19 20:49:53
 * @Description: 
 */
import { pageSeizeSech } from 'app/interface/blog';
import { Controller } from 'egg';
import { parse } from 'querystringify'
/**
 * @Controller 文章接口
 */
export default class PostList extends Controller {
  /**
      * @summary 根据专题获取文章列表
      * @description 返回文章内容
      * @router get /column/{id}/post
      * @request path string *id 
      * @request query string currentpage 页数
      * @request query string pagesize 每页少条
      * @response 200 postsList 成功
      */
  public async getPostList() {
    const { ctx } = this
    let paramsId = this.ctx.params
    let queys: string = ctx.url
    const queysCheck = queys.indexOf("?")
    let newest: pageSeizeSech = {
      curettage: 1,
      pagesize: 10
    }
    if (queysCheck) {
      let getPage = queys.replace('?', '&')
      let pageData = parse(getPage)
      newest.curettage = +(pageData as pageSeizeSech).curettage || 1
      newest.pagesize = +(pageData as pageSeizeSech).pagesize || 10
    }
    ctx.body = await ctx.service.blog.post.getPostByColumnId(paramsId.id, newest)
  }
}
