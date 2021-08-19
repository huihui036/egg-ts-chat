/*
 * @Author: XuQinghui
 * @LastEditors: XuQinghui
 * @Date: 2021-01-17 12:23:53
 * @LastEditTime: 2021-08-19 20:58:28
 * @FilePath: \chat-ts-server\typings\app\service\index.d.ts
 * @Description: 
 */
// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/user';
import ExportBlogColumn from '../../../app/service/blog/column';
import ExportBlogPost from '../../../app/service/blog/post';
import ExportEmailEmailConnect from '../../../app/service/email/email-connect';
import ExportEmailEmailSend from '../../../app/service/email/email-send';

declare module 'egg' {
  interface IService {
    test: AutoInstanceType<typeof ExportTest>;
    user: AutoInstanceType<typeof ExportUser>;
    blog: {
      column: AutoInstanceType<typeof ExportBlogColumn>;
      post: AutoInstanceType<typeof ExportBlogPost>;
    }
    email: {
      emailConnect: AutoInstanceType<typeof ExportEmailEmailConnect>;
      emailSend: AutoInstanceType<typeof ExportEmailEmailSend>;
    }
  }
}
