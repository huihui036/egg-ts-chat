import { Application } from 'egg';

export default (app: Application) => {

  const { controller, router, } = app;
  router.get('/', controller.home.index);
  // const chat: any = io.controller
  // io.of('/').route('server', chat.index);
  // io.of('/').route('exchange', app.io.controller);
  // 获取验证码
  router.post('/user/emailcode', controller.user.getEmailCode);
  // 注册
  router.post('/user/register', controller.user.register);
  // 登入
  router.post('/user/login', controller.user.login);

  router.post('/user/recetp', controller.user.recetPassword);
  // 获取专题列表
  router.get('/column', controller.bolg.columnList.columnList)
  // 根据id 获取当个专题
  router.get('/column/:id', controller.bolg.columnList.columndata)

  // 根据id 获取专题下的文章
  router.get('/column/:id/post', controller.bolg.posts.getPostList)

  // 获取用户参数    /user/current
  router.get('/user/current', controller.user.getUserData)

  // io.of('/').route('exchange', io.controller.tictactoe.exchange);

  module.exports = app => {
    //重定向到swagger-ui.html
    app.router.redirect('/', '/swagger-ui.html', 302);
  }
};
