import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610851740528_5231';

  // add your egg config in here
  config.middleware = ['errorHandler'];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };
  config.security = {
    csrf: {
      enable: false,
    }
  }

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/egg-mongo',
      options: {}
    }
  }
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    }
  };
  config.jwt = {
    secret: "165165"
  };
  config.security = {
    // 关闭 csrf
    csrf: {
      enable: false,
    },
    // 跨域白名单
    domainWhiteList: ['*'],
  };
  // 允许跨域的方法
  config.cors = {
    origin: '*',
    allowMethods: 'GET, PUT, POST, DELETE, PATCH'
  };
  config.io = {
    init: {
      wsEngine: 'ws',
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
    },

    namespace: {
      '/tictactoe': {
        connectionMiddleware: ['auth'],
        packetMiddleware: [],
      },
      '/': {
        connectionMiddleware: ['auth'],
        packetMiddleware: [],
      },
    },
  }


  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
