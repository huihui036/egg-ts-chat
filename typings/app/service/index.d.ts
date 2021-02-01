// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/user';
import ExportEmailEmailSend from '../../../app/service/email/email-send';
import ExportEmailEmaliConnect from '../../../app/service/email/emali-connect';

declare module 'egg' {
  interface IService {
    test: AutoInstanceType<typeof ExportTest>;
    user: AutoInstanceType<typeof ExportUser>;
    email: {
      emailSend: AutoInstanceType<typeof ExportEmailEmailSend>;
      emaliConnect: AutoInstanceType<typeof ExportEmailEmaliConnect>;
    }
  }
}
