import * as nodemailer from 'nodemailer';
import { Controller } from 'egg';
import { HttpExceptions } from '../../middleware/http_exceptions'
import { emailConnect } from "./emali-connect"
import configData from '../../../config/config.data'
export default class SendeEamil extends Controller {

  async register(userData) {
    const { app } = this;
    // ctx.body = ctx.request.body;

    const transporter = nodemailer.createTransport(configData.config)
    const mail = emailConnect(userData.userName, userData.codeType)
    userData.code = mail.randMathCode
    transporter.sendMail(mail, (err, info) => {
      if (err) {
        throw new HttpExceptions("邮箱发送失败")
      }
      transporter.close()
      console.log('mail sent:', info.response)
    })
    await app.redis.setex(userData.userName, 30 * 10, JSON.stringify(userData))
  }

}