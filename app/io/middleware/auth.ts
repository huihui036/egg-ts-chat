import { Context } from 'egg'

import { verify } from 'jsonwebtoken'

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
    console.log('sockeId', id);

    let userToken = socket.handshake.query.token
    let varifyToken: any = verify(userToken, app.config.jwt.secret, (err, decoded) => {
      if (!err) {
        return decoded
      }
      return err
    });

    if (!varifyToken.userId) {
      ctx.socket.emit('remove', 'tonken 错误');
      ctx.socket.disconnect(true)
      return
    }

    console.log('vwerTOKNE', varifyToken);
    // 用户信息
    logger.info(`用户加入id：${id}`)
    logger.info(`用户离开id：${id}`)
    logger.debug('#join', 123);
    const room = '123'
    socket.join(room);

    // 删除用户
    // ctx.socket.disconnect(true)
    socket.on('message', function (obj) {
      // 向所有客户端广播发布的消息
      const messageData = {
        receiver: " 接收者id",
        sender: "发生在",
        reply: "恢复id",
        content: "内容===",
        forward: " z转发给d",
        status: 1000
      }
      app.model.Message.create(messageData)
      console.log('messag', obj);
      nsp.to(room).emit('online', {
        action: 'const',
        message: obj,
      });
    });
    nsp.emit("message", "datgat")
    logger.info(`players: 123`)
    await next()
  }
}
