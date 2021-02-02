import { Application } from 'egg';

export default (app: Application) => {

  const { controller, router } = app;
  // router.get('/', controller.home.index);
  // 获取验证码
  router.post('/user/emailcode', controller.user.emailcode);
  // 注册
  router.post('/user/register', controller.user.register);
  // 登入
  router.post('/user/login', controller.user.login);
};
