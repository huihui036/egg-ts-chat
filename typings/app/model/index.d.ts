// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportMessage from '../../../app/model/message';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Message: ReturnType<typeof ExportMessage>;
    User: ReturnType<typeof ExportUser>;
  }
}
