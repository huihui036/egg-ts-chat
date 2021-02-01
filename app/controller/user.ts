import { Controller } from 'egg';
import { HttpParameterExceptions, HttpExceptions } from '../middleware/http_exceptions'

const createRule = {
  userName: {
    type: 'email',
  },
  codeType: [1000, 1001, 1002],

};


export default class UserController extends Controller {

  public async emailcode() {
    const { ctx, } = this;

    const userData = this.ctx.request.body
    // 验证邮箱
    try {
      ctx.validate(createRule, ctx.request.body)
    } catch (error) {
      throw new HttpParameterExceptions(error.errors, error.code, error.field)
    }

    ctx.model.User.create({
      name: 'UserInitName',
      age: 23,
      sex: 'girl',
      job: '程序媛',
      lastTime: Date.now()
    }, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
    let redisData = await this.app.redis.get(userData.userName)
    let isUserData
    if (redisData) {
      isUserData = JSON.parse(redisData)
    }

    if (isUserData && isUserData.codeType == 1000) {
      throw new HttpExceptions("验证码已发送", 10002, 300)
    }

    await this.service.email.emailSend.register(userData)
    ctx.body = await ctx.service.user.register(userData);

  }
}