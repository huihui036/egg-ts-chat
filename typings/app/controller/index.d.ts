// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTest from '../../../app/controller/test';
import ExportUser from '../../../app/controller/user';
import ExportBolgColumnList from '../../../app/controller/bolg/column-list';
import ExportBolgPosts from '../../../app/controller/bolg/posts';
import ExportRuleParameterRule from '../../../app/controller/rule/parameter-rule';
import ExportRuleRequestRule from '../../../app/controller/rule/request_rule';
import ExportValidatorsValidatators from '../../../app/controller/validators/validatators';

declare module 'egg' {
  interface IController {
    test: ExportTest;
    user: ExportUser;
    bolg: {
      columnList: ExportBolgColumnList;
      posts: ExportBolgPosts;
    }
    rule: {
      parameterRule: ExportRuleParameterRule;
      requestRule: ExportRuleRequestRule;
    }
    validators: {
      validatators: ExportValidatorsValidatators;
    }
  }
}
