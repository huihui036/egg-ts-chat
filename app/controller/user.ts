import { Controller } from 'egg';

import { Regiter, Logibn, checkCode, recetPasswrd } from '../interface/interface'
import Validators from './validators/validatators'

import { emailCode, regitertRule, loginRule, recetPasswrdRule } from './rule/parameter-rule'
/**
 * @Controller 用户信息
 */
export default class UserController extends Controller {
  // 获取验证码
  /**
  * @summary 创建用户获取验证码
  * @description 创建用户时获取验证码
  * @router post /user/emailcode
  * @request body createUserGetEamil *body
  * @response 200 emailCode 创建成功
  */
  public async getEmailCode() {
    const { ctx, } = this;
    const userData: checkCode = this.ctx.request.body
    // 验证参数
    new Validators(ctx).parameter(emailCode)
    await ctx.service.user.getEmailCode(userData)

  }
  /**
 * @summary 创建用户
 * @description 创建用户
 * @router post /user/register
 * @request body createUser *body
 * @response 200 emailCode 创建成功
 */
  public async register() {
    const { ctx, } = this;
    const userData: Regiter = this.ctx.request.body
    // 验证参数
    new Validators(ctx).parameter(regitertRule)
    await ctx.service.user.register(userData)
  }

  /**
* @summary 用户登入
* @description 用户登入
* @router post /user/login
* @request body LoginUser *body
* @response 200 emailCode 登入成功
*/
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
  /**
 * @summary 修改密码
 * @description 修改密码需要提正确验证码
 * @router post /user/recetp
 * @request body recetpPassword *body
 * @response 200 emailCode 登入成功
 */
  public async recetPassword() {
    const { ctx, } = this;
    const userData: recetPasswrd = this.ctx.request.body
    // 验证参数
    new Validators(ctx).parameter(recetPasswrdRule)

    await this.service.user.recetPassword(userData)
  }

  /**
     * @summary 获取用户信息
     * @description 用户信息
     * @router get /user/current
     * @response 200 userData
     */
  public async getUserData() {
    const { ctx } = this;

    const { authorization } = ctx.headers

    await this.service.user.getUserData(authorization as string)

  }

}
