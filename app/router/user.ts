/*
 * @Author: qingHui
 * @Date: 2021-08-19 17:38:14
 * @LastEditors: qingHui
 * @LastEditTime: 2021-08-19 17:53:05
 * @Description: 用户信息路由
 */
import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app
  // 注册
  router.post('/user/register', controller.user.register)
  // 登入
  router.post('/user/login', controller.user.login)
  // 获取用户参数
  router.get('/user/current', controller.user.getUserData)
  // 修改密碼
  router.post('/user/recept', controller.user.resetPassword)
}
