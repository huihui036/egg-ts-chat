import { Controller } from 'egg';
import { HttpParameterExceptions, } from '../../middleware/http_exceptions'

export default class Validators extends Controller {

  public parameter(rule) {
    const { ctx } = this
    try {
      ctx.validate(rule, ctx.request.body)
    } catch (error) {
      throw new HttpParameterExceptions(error.errors, error.code, error.field)
    }
  }
}


