/*
 * @Author: XuQinghui
 * @LastEditors: XuQinghui
 * @Date: 2021-01-29 12:31:00
 * @LastEditTime: 2021-08-19 21:03:41
 * @FilePath: \chat-ts-server\typings\app\model\index.d.ts
 * @Description: 
 */
// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportColumn from '../../../app/model/column';
import ExportMessage from '../../../app/model/message';
import ExportPosts from '../../../app/model/posts';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Column: ReturnType<typeof ExportColumn>;
    Message: ReturnType<typeof ExportMessage>;
    Posts: ReturnType<typeof ExportPosts>;
    User: ReturnType<typeof ExportUser>;
  }
}
