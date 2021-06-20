import { Service } from 'egg';
import * as fs from 'fs'
import * as path from 'path'
import { HttpExceptions } from '../middleware/http_exceptions';
export default class File extends Service {

  public async uploadfile(origin, stream) {
    const writerStream = fs.createWriteStream(path.join(this.config.baseDir, `app/public/${stream.filename}`));

    stream.pipe(writerStream);

    let imgUrl = `${origin}/public/${stream.filename}`;

    const data = {
      url: imgUrl
    }
    throw new HttpExceptions('上传成功', 10001, 200, data);

  }
}