/*
 * @Author: qingHui
 * @Date: 2021-04-16 14:19:03
 * @LastEditors: qingHui
 * @LastEditTime: 2021-08-19 17:57:16
 * @Description: 
 */
import { Application } from 'egg';

export default (app: Application) => {

  const { controller, router, io } = app;
  router.get('/', controller.home.index);
  // const chat: any = io.controller
  // io.of('/').route('server', chat.index);
  //io.of('/').route('exchange', app.io.controller);
  // 获取验证码
  router.post('/user/emailed', controller.user.getEmailCode);

  // 测试博客信息
  // 获取专题列表
   router.get('/column', controller.blog.columnList.columnList)
  // 根据id 获取当个专题
  router.get('/column/:id', controller.blog.columnList.columnists)
  // 根据id 获取专题下的文章
  router.get('/column/:id/post', controller.blog.posts.getPostList)
  

  // socketIo
  io.of('/').route('exchange', io.controller.tictactoe.exchange);

  module.exports = app => {
    //重定向到swagger-ui.html
    app.router.redirect('/', '/swagger-ui.html', 302);
  }
};
