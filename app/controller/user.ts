import { Controller } from 'egg';

import { Regiter, Logibn, checkCode, recetPasswrd } from '../interface/interface'
import Validators from './validators/validatators'

import { emailCode, regitertRule, loginRule, recetPasswrdRule } from './rule/parameter-rule'

export default class UserController extends Controller {
  // 获取验证码
  public async getEmailCode() {
    const { ctx, } = this;
    const userData: checkCode = this.ctx.request.body
    // 验证参数
    new Validators(ctx).parameter(emailCode)
    await ctx.service.user.getEmailCode(userData)

  }
  // 注册
  public async register() {
    const { ctx, } = this;
    const userData: Regiter = this.ctx.request.body
    // 验证参数
    new Validators(ctx).parameter(regitertRule)
    await ctx.service.user.register(userData)

  }
  public async login() {
    const { ctx, } = this;
    const userData: Logibn = this.ctx.request.body
    // 验证参数
    new Validators(ctx).parameter(loginRule)
    // 成功返回
    const userLogin = await ctx.service.user.userLogin(userData)

    ctx.body = {
      status: 200,
      code: 10000,
      user_id: userLogin.id,
      token: userLogin.token,
      httpCode: 200,
    }

  }
  // 忘记密码

  public async recetPassword() {
    const { ctx, } = this;
    const userData: recetPasswrd = this.ctx.request.body
    // 验证参数
    new Validators(ctx).parameter(recetPasswrdRule)

    await this.service.user.recetPassword(userData)
  }

}