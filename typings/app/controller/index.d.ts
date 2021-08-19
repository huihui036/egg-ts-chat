// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';
import ExportBlogColumnList from '../../../app/controller/blog/columnList';
import ExportBlogPosts from '../../../app/controller/blog/posts';
import ExportRuleParameterRule from '../../../app/controller/rule/parameter-rule';
import ExportRuleRequestRule from '../../../app/controller/rule/request_rule';
import ExportValidatorsValidators from '../../../app/controller/validators/validators';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    user: ExportUser;
    blog: {
      columnList: ExportBlogColumnList;
      posts: ExportBlogPosts;
    }
    rule: {
      parameterRule: ExportRuleParameterRule;
      requestRule: ExportRuleRequestRule;
    }
    validators: {
      validators: ExportValidatorsValidators;
    }
  }
}
