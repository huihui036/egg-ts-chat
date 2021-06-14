import { pageSzieSsech } from 'app/interface/bolg';
import { Controller } from 'egg';
import { parse } from 'querystringify'
export default class PostList extends Controller {
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
