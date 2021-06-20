// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportFile from '../../../app/service/file';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/user';
import ExportBolgColunm from '../../../app/service/bolg/colunm';
import ExportBolgPost from '../../../app/service/bolg/post';
import ExportEmailEmailSend from '../../../app/service/email/email-send';
import ExportEmailEmaliConnect from '../../../app/service/email/emali-connect';

declare module 'egg' {
  interface IService {
    file: AutoInstanceType<typeof ExportFile>;
    test: AutoInstanceType<typeof ExportTest>;
    user: AutoInstanceType<typeof ExportUser>;
    bolg: {
      colunm: AutoInstanceType<typeof ExportBolgColunm>;
      post: AutoInstanceType<typeof ExportBolgPost>;
    }
    email: {
      emailSend: AutoInstanceType<typeof ExportEmailEmailSend>;
      emaliConnect: AutoInstanceType<typeof ExportEmailEmaliConnect>;
    }
  }
}
