import { Service } from 'egg';
import { v4 as uuidv4 } from 'uuid';
import { hashSync, compareSync } from 'bcrypt'
import { Regiter, RegiterDb, Logibn, checkCode, recetPasswrd } from '../interface/interface'
import { HttpExceptions } from '../middleware/http_exceptions'
import { EmailType } from './email/emali-connect'
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
  public async register(userData: Regiter) {
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
    let userDb: RegiterDb = { ...userData, state: 1, account: uuidv4() }
    const saltRounds = 10;
    userDb.password = hashSync(userDb.password, saltRounds)
    const creatUser = await this.app.model.User.create(userDb)
    if (creatUser) {
      throw new HttpExceptions("注册成功", 10008, 200)
    }
    throw new HttpExceptions("注册失败，请重新注册", 10009, 200)
  }

  public async userLogin(userData: Logibn): Promise<LoginReturn> {
    const userIsExistence = await this.app.model.User.findOne({ "email": userData.email })
    if (!userIsExistence) {
      throw new HttpExceptions("登入失败用户不存在", 10006, 400)
    }

    const passwordTure = compareSync(userData.password, userIsExistence.password)
    if (!passwordTure) {
      throw new HttpExceptions("密码错误", 10007, 400)
    }
    const token = this.app.jwt.sign({
      userName: userIsExistence.name,
      userId: userIsExistence.id,
    }, this.app.config.jwt.secret);

    return {
      token,
      id: userIsExistence.id
    }
  }

  // async getRedis(userData): Promise<checkCode> {
  //   let redisData = await this.app.redis.get(userData.email)
  //   let isUserData
  //   if (redisData) {
  //     isUserData = JSON.parse(redisData)
  //   }
  //   console.log(isUserData)
  //   if (isUserData && isUserData.codeType == userData.codeType) {
  //     throw new HttpExceptions("验证码已发送", 10003, 300)
  //   }

  //   return isUserData
  // }
  public async getEmailCode(userData: checkCode) {
    // 检验是否30分钟内已经发送过注册验证码
    let redisData = await this.app.redis.get(userData.email)
    let isUserData: any = {
      codeType: 0
    }
    if (redisData) {
      isUserData = JSON.parse(redisData)
    }
    console.log(isUserData)
    if (isUserData && isUserData.code_type == userData.code_type) {
      throw new HttpExceptions("验证码已发送", 10003, 300)
    }
    const userIsExistence = await this.app.model.User.findOne({ "email": userData.email })
    if (userIsExistence && isUserData.code_type == userData.code_type) {
      throw new HttpExceptions("该邮箱已经被注册", 10001, 200)
    }
    // 将验证码通过email 发送到用户邮箱
    await this.service.email.emailSend.sendEmail(userData)
    throw new HttpExceptions(`验证码已经成功发送${isUserData.code}`, 10002, 200)
  }

  public async recetPassword(userData: recetPasswrd) {
    const userIsExistence = await this.app.model.User.findOne({ "email": userData.email })
    if (!userIsExistence) {
      throw new HttpExceptions("该邮箱还没注册", 10001, 200)
    }
    let redisData = await this.app.redis.get(userData.email)
    let isUserData
    if (redisData) {
      isUserData = JSON.parse(redisData)
    }

    if (isUserData && isUserData.code_type == EmailType.recetPassword) {
      if (isUserData.code != userData.check_code) {
        throw new HttpExceptions("密码修改失败，验证码错误", 10007, 200)
      }
      const saltRounds = 10;
      const password = hashSync(userData.new_password, saltRounds)
      let updata = await this.app.model.User.findOneAndUpdate({ "email": userData.email }, { password: password })
      if (updata) {
        throw new HttpExceptions("密码修改成", 10010, 200)
      } else {
        throw new HttpExceptions("密码修改失败", 10011, 400)
      }

    } else {
      throw new HttpExceptions("验证码错误,请重新获取验证码", 10007, 400)
    }


  }
}
