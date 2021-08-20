/*
 * @Author: qingHui
 * @Date: 2021-06-15 09:34:41
 * @LastEditors: qingHui
 * @LastEditTime: 2021-08-20 15:20:04
 * @Description: 
 */
import { Controller } from 'egg';
import { HttpParameterExceptions, } from '../../middleware/http_exceptions'

export default class Validators extends Controller {

  public parameter(rule) {
    const { ctx } = this
    try {
      ctx.validate(rule, ctx.request.body)
    } catch (error) {
      throw new HttpParameterExceptions(400, error.errors)
    }
  }
}


