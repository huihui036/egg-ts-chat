import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  // sequelize: {
  //   enable: true,
  //   package: 'egg-sequelize',
  // },
  mongoose: {
    enable: true, // 开启插件
    package: 'egg-mongoose'
  },
  io: {
    enable: true,
    package: 'egg-socket.io',
  }

};

export default plugin;
