/*
 * @Author: qingHui
 * @Date: 2021-06-15 09:34:41
 * @LastEditors: qingHui
 * @LastEditTime: 2021-08-19 09:22:57
 * @Description: 
 */
import { Context } from 'egg';

import { verify } from 'jsonwebtoken';

export default function AuthMiddleware() {
  return async (ctx: Context, next: () => Promise<any>) => {
    const {
      app,
      socket,
      logger,
    } = ctx;
    const id = socket.id;
    const nsp = app.io.of('/');
    // const query = socket.handshake.query;
    console.log('socketId', id);

    const userToken = socket.handshake.query.token;
    const verifyToken: any = verify(userToken, app.config.jwt.secret, (err, decoded) => {
      if (!err) {
        return decoded;
      }
      return err;
    });

    if (!verifyToken.userId) {
      ctx.socket.emit('remove', 'token is error');
      //   ctx.socket.disconnect(true);
      //    return;
    }


    // 用户信息
    // logger.info(`用户加入id：${id}`);
    //   logger.info(`用户离开id：${id}`);
    logger.debug('#join', 123);
    const room = '123';
    socket.join(room);

    // 删除用户
    // ctx.socket.disconnect(true)
    socket.on('message', obj => {
      // 向所有客户端广播发布的消息
      const messageData = {
        receiver: ' 接收者id',
        sender: '发生在',
        reply: '恢复id',
        content: '内容===',
        forward: ' z转发给d',
        status: 1000,
      };
      app.model.Message.create(messageData);
      console.log('message', obj);
      nsp.to(room).emit('message', {
        action: 'const',
        message: obj,
      });
    });

    logger.info('players: 123');
    await next();
  };
}
