import { Application } from 'egg';

export default (app: Application) => {

  const { controller, router, io } = app;
  // router.get('/', controller.home.index);
  // const chat: any = io.controller
  // io.of('/').route('server', chat.index);
  // 获取验证码
  // io.of('/').route('exchange', app.io.controller);

  router.post('/user/emailcode', controller.user.getEmailCode);
  // 注册
  router.post('/user/register', controller.user.register);
  // 登入
  router.post('/user/login', controller.user.login);
  router.post('/user/recetp', controller.user.recetPassword);
  io.of('/').route('exchange', io.controller.tictactoe.exchange);
};
