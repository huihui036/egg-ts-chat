// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportResultData from '../../../app/service/result-data';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/user';
import ExportBlogColumn from '../../../app/service/blog/column';
import ExportBlogPost from '../../../app/service/blog/post';
import ExportEmailEmailConnect from '../../../app/service/email/email-connect';
import ExportEmailEmailSend from '../../../app/service/email/email-send';

declare module 'egg' {
  interface IService {
    resultData: AutoInstanceType<typeof ExportResultData>;
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
