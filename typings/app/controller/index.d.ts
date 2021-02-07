// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';
import ExportRuleParameterRule from '../../../app/controller/rule/parameter-rule';
import ExportValidatorsValidatators from '../../../app/controller/validators/validatators';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    user: ExportUser;
    rule: {
      parameterRule: ExportRuleParameterRule;
    }
    validators: {
      validatators: ExportValidatorsValidatators;
    }
  }
}
