import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610851740528_5231'

  // add your egg config in here
  config.middleware = ['errorHandler']

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  }
  config.security = {
    csrf: {
      enable: false,
    },
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/egg-mongo',
      options: {},
    },
  }
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  }
  config.jwt = {
    secret: '165165',
  }
  config.requestResult= {
    successes : 1 ,// 成功
    fail : 4, //失败
    dataEmpty :5, //数据为空
    forbidden : 6, // 权限拒绝
  }
  config.emailData = {
    // 163邮箱 为smtp.163.com
    host: 'smtp.qq.com', //这是qq邮箱
    //端口
    port: 465,
    auth: {
      // 发件人邮箱账号
      user: '1315574336@qq.com',
      //发件人邮箱的授权码 这里可以通过qq邮箱获取 并且不唯一 hqeztzqnfzxyfihg
      pass: 'rijvynuaaesdbacd',
    },
  }
  config.security = {
    // 关闭 csrf
    csrf: {
      enable: false,
    },
    // 跨域白名单
    domainWhiteList: ['*'],
  }
  // 允许跨域的方法
  config.cors = {
    origin: '*',
    allowMethods: 'GET, PUT, POST, DELETE, PATCH',
  }
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
  // 配置上传文件白名单
  config.multipart = {
    fileExtensions: ['.pdf', '.txt', '.xlsx', 'png', 'jpg', 'jpge'],
  }
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
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  }
}
