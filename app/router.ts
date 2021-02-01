import { Application } from 'egg';

export default (app: Application) => {

  const { controller, router } = app;
  router.get('/', controller.home.index);
  // 获取验证码
  router.post('/user/emailcode', controller.user.emailcode);
};
