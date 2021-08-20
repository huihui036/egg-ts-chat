import { Service } from 'egg'
import { v4 as uuidv4 } from 'uuid'
const fs = require('fs')
const path = require('path')
import { hashSync, compareSync } from 'bcrypt'
import {
  Register,
  RegisterDb as RecitedDb,
  Logion,
  checkCode,
  resetPassword,
} from '../interface/interface'
import { HttpExceptions } from '../middleware/http_exceptions'
// import { EmailType } from './email/email-connect';
/**
 * Test Service
 */

interface LoginReturn {
  token: string
  id: string
}
export default class User extends Service {
  /**
   * sayHi to you
   * @param unreData - your unreData
   */
  public async register(userData: Register) {
    // 密码检查
    if (userData.password !== userData.password2) {
      throw new HttpExceptions('两次密码输入不同', this.app.config.requestResult.fail, 200)
    }

    // 验证码检查
    // const redisData = await this.app.redis.get(userData.email);
    // if (redisData) {
    //   const isUserData: checkCode = JSON.parse(redisData);
    //   if (isUserData.code !== userData.checkCode) {
    //     throw new HttpExceptions('验证码错误', 10007, 400);
    //   }
    // } else {
    //   throw new HttpExceptions('验证码错误', 10007, 400);
    // }
    const findUser = await this.app.model.User.findOne({
      email: userData.email,
    })
    if (findUser) {
      throw new HttpExceptions('邮箱已经被注册', this.app.config.requestResult.fail, 200)
    }
    const userDb: RecitedDb = { ...userData, state: 1, account: uuidv4() }
    // 密码密码
    const saltRounds = 10
    userDb.password = hashSync(userDb.password, saltRounds)
    const creatUser = await this.app.model.User.create(userDb)

    if (creatUser) {
      throw new HttpExceptions('注册成功', this.app.config.requestResult.successes, 200)
    }
    throw new HttpExceptions('注册失败，请重新注册', this.app.config.requestResult.fail, 200)
  }

  public async userLogin(userData: Logion): Promise<LoginReturn> {
    const userIsExistence = await this.app.model.User.findOne({
      email: userData.email,
    })
    if (!userIsExistence) {
      throw new HttpExceptions('登入失败用户不存在', this.app.config.requestResult.fail, 200)
    }

    const passwordTrue = compareSync(
      userData.password,
      userIsExistence.password
    )
    if (!passwordTrue) {
      throw new HttpExceptions('密码错误', this.app.config.requestResult.fail, 200)
    }
    const created: number = Math.floor(Date.now() / 1000)
    const token = this.app.jwt.sign(
      {
        userName: userIsExistence.name,
        userId: userIsExistence.id,
        exp: created + (10*100), // 过期时间
      },
      this.app.config.jwt.secret
    )

    throw new HttpExceptions('登入成功', this.app.config.requestResult.successes, 200, { token: token })
  }

  // 获取验证码
  public async getEmailCode(userData: checkCode) {
    // 检验是否30分钟内已经发送过注册验证码
    const redisData = await this.app.redis.get(userData.email)
    let isUserData: any = {
      codeType: 0,
    }
    if (redisData) {
      isUserData = JSON.parse(redisData)
    }
    // if (isUserData && isUserData.code_type === userData.codeType) {
    //   throw new HttpExceptions('验证码已发送', 10003, 300);
    // }
    const userIsExistence = await this.app.model.User.findOne({
      email: userData.email,
    })
    if (userIsExistence && isUserData.codeType === userData.codeType) {
      throw new HttpExceptions('该邮箱已经被注册', this.app.config.requestResult.fail, 200)
    }
    // 将验证码通过email 发送到用户邮箱
    await this.service.email.emailSend.sendEmail(userData)
    throw new HttpExceptions(`验证码已经成功发送`, this.app.config.requestResult.successes, 200)
  }
  // 重置密码
  public async rectPassword(userData: resetPassword) {
    const userIsExistence = await this.app.model.User.findOne({
      email: userData.email,
    })
    if (!userIsExistence) {
      throw new HttpExceptions('该邮箱还没注册', this.app.config.requestResult.fail, 200)
    }
    // const redisData = await this.app.redis.get(userData.email);
    // let isUserData;
    // if (redisData) {
    //   isUserData = JSON.parse(redisData);
    // }

    // if (isUserData && isUserData.code_type === EmailType.recetPassword) { }
    // if (isUserData.code !== userData.checkCode) {
    //   throw new HttpExceptions('密码修改失败，验证码错误', 10007, 200);
    // }
    const saltRounds = 10
    const password = hashSync(userData.newPassword, saltRounds)
    const update = await this.app.model.User.findOneAndUpdate(
      { email: userData.email },
      { password }
    )
    if (update) {
      throw new HttpExceptions('密码修改成功', this.app.config.requestResult.successes, 200)
    } else {
      throw new HttpExceptions('密码修改失败', this.app.config.requestResult.fail, 200)
    }

    // else {
    //   throw new HttpExceptions('验证码错误,请重新获取验证码', 10007, 400);
    // }
  }
  // 获取用户信息
  public async getUserData(token: string) {
    if (!token) throw new HttpExceptions(`请传入token`, this.app.config.requestResult.fail, 200)
    const headerToken = token.split('Bearer ')[1]
    const tokenData = this.app.jwt.verify(
      headerToken,
      this.app.config.jwt.secret
    )
    console.log(tokenData)
    // TODO 验证token

    const userData: any = tokenData as Object

    const findUserData = await this.app.model.User.findOne({
      _id: userData.userId,
    })

    const returnDat = {
      _id: findUserData._id,
      account: findUserData.account,
      date: findUserData.date,
      email: findUserData.email,
      userName: findUserData.userName,
    }

    throw new HttpExceptions(`成功`, this.app.config.requestResult.successes, 200, returnDat)
  }
  // 文件上传
  async uploadImg(origin, stream) {
    
    const writerStream = fs.createWriteStream(
      path.join(this.config.baseDir, `app/public/${stream.filename}`)
    )
    if (writerStream) {
      console.log('12313')
    }
    stream.pipe(writerStream)
    let imgUrl = `${origin}/public/${stream.filename}`
    throw new HttpExceptions(`上传成功`, this.app.config.requestResult.successes, 200, { url: imgUrl })
  }
}
