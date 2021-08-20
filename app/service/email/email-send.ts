/*
 * @Author: qingHui
 * @Date: 2021-04-16 14:19:03
 * @LastEditors: qingHui
 * @LastEditTime: 2021-08-19 18:23:06
 * @Description: 
 */
import * as nodemailer from 'nodemailer';
import { Controller } from 'egg';
import { HttpExceptions } from '../../middleware/http_exceptions';
import { emailConnect } from './email-connect';
import configData from '../../../config/config.data';
import { checkCode } from '../../interface/interface';
export default class SendeEamil extends Controller {

  async sendEmail(userData: checkCode) {
    const { app } = this;
    // ctx.body = ctx.request.body;
    const transporter = nodemailer.createTransport(configData.config)
    const mail = emailConnect(userData.email, userData.codeType)
    const saveCode: checkCode = {
      email: userData.email,
      codeType: userData.codeType,
      code: mail.randMathCode
    }
    transporter.sendMail(mail, (err, info) => {
      if (err) {
        throw new HttpExceptions('邮箱发送失败');
      }
      transporter.close()
      console.log('mail sent:', info)
    })
    await app.redis.setex(userData.email, 6 * 10 * 30, JSON.stringify(saveCode))
  }

}
