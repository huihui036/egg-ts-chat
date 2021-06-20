import { Controller } from 'egg';

/**
 * @Controller 文件上传
 */
export default class FileController extends Controller {
  /**
     * @summary 上传图片
     * @description 上传图片
     * @router post /upload/file
     * @request formData file *file
     * @response 200  上传成功
     */
  public async uploadFile() {
    const { ctx, } = this;
    const stream = await ctx.getFileStream();

    const origin = ctx.origin;


    await ctx.service.file.uploadfile(origin, stream)
  }
}