import { Controller } from 'egg'


declare module 'egg' {
  interface CustomController {
    tictactoe: tictactoeController
  }
}

export enum ExchangeEvent {
  JOIN = 'join',
  PLAYER_LIST = 'player_list',
  INVITE_GAME = 'invite_game',
  RESIGN = 'resign',
  PLAY = 'play'
}

export default class tictactoeController extends Controller {
  public async exchange() {
    const { ctx, app, } = this
    const nsp = app.io.of('/');
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    const client = socket.id;

    try {
      const { target, payload } = message;
      if (!target) return;
      const msg = ctx.helper.parseMsg('exchange', payload, { client, target });
      nsp.emit(target, msg);
    } catch (error) {
      app.logger.error(error);
    }
  }
}
