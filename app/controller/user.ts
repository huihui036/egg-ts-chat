import { Controller } from 'egg';
import { compareSync } from 'bcrypt'
import { HttpParameterExceptions, HttpExceptions } from '../middleware/http_exceptions'
import { checkCode } from "../interface/interface"
import { Regiter } from '../interface/interface'

const createRule = {
  userName: {
    type: 'email',
  },
  codeType: [1000, 1001, 1002],

};

const regitertRule = {
  email: {
    type: 'email',
  },
  name: {
    type: "string",
  },
  check_code: {
    type: "string",
    max: 6,
    min: 6,
  },
  password: {
    type: "password",
    allowEmpty: false
  },
  password2: {
    type: "password",
    allowEmpty: false
  }
}
const loginRule = {
  email: {
    type: 'email',
  },
  password: {
    type: "password",
    allowEmpty: false
  },
}

export default class UserController extends Controller {

  public async emailcode() {
    const { ctx, } = this;

    const userData = this.ctx.request.body
    // 验证参数
    try {
      ctx.validate(createRule, ctx.request.body)
    } catch (error) {
      throw new HttpParameterExceptions(error.errors, error.code, error.field)
    }
    // 数据库查询--该用邮箱是否已经注册
    let userIsExistence
    try {
      userIsExistence = await ctx.service.user.findUserByemail(userData.userName)
    } catch (error) {
      console.log(error)
      throw new HttpExceptions("邮箱查询失败", 10004, 400)
    }
    if (userIsExistence) {
      throw new HttpExceptions("该邮箱已经被注册", 10001, 400)
    }
    // 从redis 检查用户30分钟内是否已经申请过 注册验证码
    let redisData = await this.app.redis.get(userData.userName)
    let isUserData
    if (redisData) {
      isUserData = JSON.parse(redisData)
    }
    console.log(isUserData)
    if (isUserData && isUserData.codeType == 1000) {
      throw new HttpExceptions("验证码已发送", 10003, 300)
    }
    // 将验证码通过email 发送到用户邮箱

    await this.service.email.emailSend.sendEmail(userData)
    throw new HttpExceptions(`验证码已经成功发送${redisData}`, 10002, 200)

  }
  public async register() {
    const { ctx, } = this;
    const userData: Regiter = this.ctx.request.body

    // 验证参数
    try {
      ctx.validate(regitertRule, ctx.request.body)
    } catch (error) {
      throw new HttpParameterExceptions(error.errors, error.code, error.field)
    }


    // 密码检查
    if (userData.password !== userData.password2) {
      throw new HttpExceptions("两次密码输入不同", 10006, 400)
    }

    // 验证码检查
    let redisData = await this.app.redis.get(userData.email)
    if (redisData) {
      let isUserData: checkCode = JSON.parse(redisData)
      if (isUserData.code !== userData.check_code) {
        throw new HttpExceptions("验证码错误", 10007, 400)
      }
    } else {
      throw new HttpExceptions("验证码错误", 10007, 400)
    }
    let creatData = await ctx.service.user.register(userData)
    if (creatData.status == 1) {
      throw new HttpExceptions("注册成功", 10007, 200)
    }
    throw new HttpExceptions("注册失败，请重新注册", 10007, 200)
  }
  public async login() {
    const { ctx, } = this;
    const userData = this.ctx.request.body
    console.log(userData)
    // 验证参数
    try {
      ctx.validate(loginRule, ctx.request.body)
    } catch (error) {
      throw new HttpParameterExceptions(error.errors, error.code, error.field)
    }

    let userIsExistence
    try {
      userIsExistence = await ctx.service.user.findUserByemail(userData.email)
    } catch (error) {
      console.log(error)
      throw new HttpExceptions("登入用户查询失败", 10004, 400)
    }
    if (!userIsExistence) {
      throw new HttpExceptions("登入失败用户不存在", 10006, 400)
    }
    const passwordTure = compareSync(userData.password, userIsExistence.password)
    if (!passwordTure) {
      throw new HttpExceptions("密码错误l", 10006, 400)
    }
    throw new HttpExceptions("登入成功", 10006, 200)
  }
}