'use strict';


export = () => {
  return async (ctx, next) => {
    console.log(ctx.packet);
    ctx.socket.emit('res', 'packet!' + "say");
    await next();
    console.log('packet response!');
  };
};