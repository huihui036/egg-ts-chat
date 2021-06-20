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
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/egg-mongo',
      options: {},
    },
  };
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };
  config.jwt = {
    secret: '165165',
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
    allowMethods: 'GET, PUT, POST, DELETE, PATCH',
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
  };

  config.swaggerdoc = {
    dirScanner: './app/controller', //插件扫描的文档路径
    apiInfo: {
      title: 'swagger文档',
      description: 'egg.js swagger-demo文档',
      version: '1.0.0',
    },
    consumes: ['application/json', 'multipart/form-data'], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html
    produces: ['application/json', 'multipart/form-data'], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回
    schemes: ['http', 'https'],
    routerMap: true, // 是否自动生成route
    enable: true,
    securityDefinitions: {
      // basicAuth: { // basicAuth之后接口注释 @basicAuth
      //   type: "basic",
      // },
      token: {
        type: 'apiKey',
        name: 'clientkey',
        in: 'header',
      },
    }
  };

  // 配置上传文件白名单
  config.multipart = {
    fileExtensions: ['.pdf', '.txt', '.png', 'jpg', 'jpge'],
    // fileSize: "20mb"
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
