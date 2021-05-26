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
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
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



  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
