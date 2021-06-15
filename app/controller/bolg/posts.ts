import { pageSzieSsech } from 'app/interface/bolg';
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
    let querys: string = ctx.url
    const querysCheck = querys.indexOf("?")
    let newstr: pageSzieSsech = {
      currentpage: 1,
      pagesize: 10
    }
    if (querysCheck) {
      let getPage = querys.replace('?', '&')
      let pageData = parse(getPage)
      newstr.currentpage = +(pageData as pageSzieSsech).currentpage || 1
      newstr.pagesize = +(pageData as pageSzieSsech).pagesize || 10
    }
    ctx.body = await ctx.service.bolg.post.getPopstByColunmId(paramsId.id, newstr)
  }
}
