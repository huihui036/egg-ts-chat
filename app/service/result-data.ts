/*
 * @Author: qingHui
 * @Date: 2021-08-20 15:25:09
 * @LastEditors: qingHui
 * @LastEditTime: 2021-08-20 15:44:31
 * @Description: 结果状态
 */

// 成功状态
export enum RequestResult {
  successes = 1, // 成功
  fail = 4, // 失败
  dataEmpty = 5, //数据为空
  forbidden = 6, // 权限拒绝
}
