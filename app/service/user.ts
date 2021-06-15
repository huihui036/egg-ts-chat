import { Service } from 'egg';
import { v4 as uuidv4 } from 'uuid';
import { hashSync, compareSync } from 'bcrypt';
import { Regiter, RegiterDb, Logibn, checkCode, recetPasswrd } from '../interface/interface';
import { HttpExceptions } from '../middleware/http_exceptions';
import { EmailType } from './email/emali-connect';
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
      throw new HttpExceptions('两次密码输入不同', 10006, 400);
    }
    // 验证码检查
    const redisData = await this.app.redis.get(userData.email);
    if (redisData) {
      const isUserData: checkCode = JSON.parse(redisData);
      if (isUserData.code !== userData.checkCode) {
        throw new HttpExceptions('验证码错误', 10007, 400);
      }
    } else {
      throw new HttpExceptions('验证码错误', 10007, 400);
    }
    const userDb: RegiterDb = { ...userData, state: 1, account: uuidv4() };
    const saltRounds = 10;
    userDb.password = hashSync(userDb.password, saltRounds);

    const creatUser = await this.app.model.User.create(userDb);
    if (creatUser) {
      throw new HttpExceptions('注册成功', 10008, 200);
    }
    throw new HttpExceptions('注册失败，请重新注册', 10009, 200);
  }

  public async userLogin(userData: Logibn): Promise<LoginReturn> {
    const userIsExistence = await this.app.model.User.findOne({ email: userData.email });
    if (!userIsExistence) {
      throw new HttpExceptions('登入失败用户不存在', 10006, 400);
    }

    const passwordTure = compareSync(userData.password, userIsExistence.password);
    if (!passwordTure) {
      throw new HttpExceptions('密码错误', 10007, 400);
    }
    const token = this.app.jwt.sign({
      userName: userIsExistence.name,
      userId: userIsExistence.id,
    }, this.app.config.jwt.secret);

    throw new HttpExceptions('登入成功', 10006, 200, { token: token });

  }

  public async getEmailCode(userData: checkCode) {
    // 检验是否30分钟内已经发送过注册验证码
    const redisData = await this.app.redis.get(userData.email);
    let isUserData: any = {
      codeType: 0,
    };
    if (redisData) {
      isUserData = JSON.parse(redisData);
    }
    console.log(isUserData);
    // if (isUserData && isUserData.code_type === userData.codeType) {
    //   throw new HttpExceptions('验证码已发送', 10003, 300);
    // }
    const userIsExistence = await this.app.model.User.findOne({ email: userData.email });
    if (userIsExistence && isUserData.codeType === userData.codeType) {
      throw new HttpExceptions('该邮箱已经被注册', 10001, 400);
    }
    // 将验证码通过email 发送到用户邮箱
    await this.service.email.emailSend.sendEmail(userData);
    throw new HttpExceptions(`验证码已经成功发送${isUserData}`, 10002, 200);
  }

  public async recetPassword(userData: recetPasswrd) {
    const userIsExistence = await this.app.model.User.findOne({ email: userData.email });
    if (!userIsExistence) {
      throw new HttpExceptions('该邮箱还没注册', 10001, 200);
    }
    const redisData = await this.app.redis.get(userData.email);
    let isUserData;
    if (redisData) {
      isUserData = JSON.parse(redisData);
    }

    if (isUserData && isUserData.code_type === EmailType.recetPassword) {
      if (isUserData.code !== userData.check_code) {
        throw new HttpExceptions('密码修改失败，验证码错误', 10007, 200);
      }
      const saltRounds = 10;
      const password = hashSync(userData.new_password, saltRounds);
      const updata = await this.app.model.User.findOneAndUpdate({ email: userData.email }, { password });
      if (updata) {
        throw new HttpExceptions('密码修改成功', 10010, 200);
      } else {
        throw new HttpExceptions('密码修改失败', 10011, 401);
      }

    } else {
      throw new HttpExceptions('验证码错误,请重新获取验证码', 10007, 400);
    }


  }
  // 获取用户信息
  public async getUserData(token: string) {
    if (!token) throw new HttpExceptions(`请传入toekn`, 10002, 400);
    const headerToken = token.split('Bearer ')[1]
    console.log(headerToken)
    const tokenData = this.app.jwt.verify(headerToken, '165165')

    const userData: any = tokenData as Object

    const findUserData = await this.app.model.User.findOne({ _id: userData.userId })
    const returnDat = {
      _id: findUserData._id,
      account: findUserData.account,
      date: findUserData.date,
      email: findUserData.email,
      userName: findUserData.userName
    }
    throw new HttpExceptions(`成功`, 10002, 200, returnDat);
  }
}
