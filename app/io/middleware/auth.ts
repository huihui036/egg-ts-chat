import { Context } from 'egg'


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
    // 用户信息
    logger.info(`用户加入id：${id}`)
    // 连接建立
    logger.info(`用户离开id：${id}`)
    //   console.log(query)
    logger.debug('#join', 123);
    const room = '123'
    socket.join(room);
    const obj = {
      name: "huihui",
      age: 123
    }
    console.log(id)
    // console.log(nsp.server.sockets)
    nsp.to(id).emit('message', JSON.stringify(obj))
    ctx.socket.emit('res', 'packet received!=====');
    // 删除用户
    // ctx.socket.disconnect(true)
    socket.on('message', function (obj) {
      // 向所有客户端广播发布的消息
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
