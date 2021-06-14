// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportColunm from '../../../app/model/colunm';
import ExportMessage from '../../../app/model/message';
import ExportPosts from '../../../app/model/posts';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Colunm: ReturnType<typeof ExportColunm>;
    Message: ReturnType<typeof ExportMessage>;
    Posts: ReturnType<typeof ExportPosts>;
    User: ReturnType<typeof ExportUser>;
  }
}
