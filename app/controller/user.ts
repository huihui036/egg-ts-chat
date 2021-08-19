import { Controller } from 'egg';

import { Register, Logion, checkCode,  resetPassword } from '../interface/interface'
import Validators from './validators/validators'

import { emailCode, registersRule, loginRule, rectPasswordRule } from './rule/parameter-rule'
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
    const userData: Register = this.ctx.request.body
    // 验证参数
    new Validators(ctx).parameter(registersRule)
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
    const userData: Logion = this.ctx.request.body
    // 验证参数
    new Validators(ctx).parameter(loginRule)
    // 成功返回
    await ctx.service.user.userLogin(userData)

    

  }
  // 忘记密码
  /**
 * @summary 修改密码
 * @description 修改密码需要提正确验证码
 * @router post /user/recetp
 * @request body recetpPassword *body
 * @response 200 emailCode 登入成功
 */
  public async resetPassword() {
    const { ctx, } = this;
    const userData: resetPassword = this.ctx.request.body
    // 验证参数
    new Validators(ctx).parameter(rectPasswordRule)

    await this.service.user.rectPassword(userData)
  }

  /**
     * @summary 获取用户信息
     * @description 用户信息
     * @router get /user/current
     * @response 200 userData
     */
  public async getUserData() {
    const { ctx } = this;
 
    const {  authorization } = ctx.header
    await this.service.user.getUserData(authorization as string)

  }

  /**
  * @summary 上传图片
  * @description 上传图片
  * @router post /v1/upload
  * @request formData string id 用户ID
  * @request formData file *file
  * @response 200 uploadResponse 更新成功
  */
  async upload() {
    const { ctx, service } = this;

    const stream = await ctx.getFileStream();
    console.log(stream)
    // const id = stream.fields.id;
    const origin = ctx.origin;

    ctx.body = await service.user.uploadImg(origin, stream);

  }

}
