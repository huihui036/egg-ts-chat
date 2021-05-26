// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';
import ExportRuleRequestRule from '../../../app/controller/rule/request_rule';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    user: ExportUser;
    rule: {
      requestRule: ExportRuleRequestRule;
    }
  }
}
