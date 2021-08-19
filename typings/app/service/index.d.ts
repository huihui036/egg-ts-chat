// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/user';
import ExportBolgColumn from '../../../app/service/bolg/column';
import ExportBolgPost from '../../../app/service/bolg/post';
import ExportEmailEmailConnect from '../../../app/service/email/email-connect';
import ExportEmailEmailSend from '../../../app/service/email/email-send';

declare module 'egg' {
  interface IService {
    test: AutoInstanceType<typeof ExportTest>;
    user: AutoInstanceType<typeof ExportUser>;
    bolg: {
      column: AutoInstanceType<typeof ExportBolgColumn>;
      post: AutoInstanceType<typeof ExportBolgPost>;
    }
    email: {
      emailConnect: AutoInstanceType<typeof ExportEmailEmailConnect>;
      emailSend: AutoInstanceType<typeof ExportEmailEmailSend>;
    }
  }
}
