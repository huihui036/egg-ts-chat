/*
 * @Author: XuQinghui
 * @LastEditors: XuQinghui
 * @Date: 2021-06-12 16:40:53
 * @LastEditTime: 2021-08-19 21:04:10
 * @FilePath: \chat-ts-server\app\model\column.ts
 * @Description: 
 */
export default function (app: { mongoose: any }) {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ColumnSchema = new Schema({
    avatar: {
      type: String,
      comment: '用户头像',
    },
    featured: {
      type: Boolean,
      required: [true, '此项为必填内容'],
      comment: '特色专题',
    },
    description: {
      type: String,
      required: [true, '此项为必填内容'],
      comment: '内容',
    },
    title: {
      type: String,
      required: [true, '此项为必填内容'],
      comment: '标题',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  });

  const Column = mongoose.model('colunm', ColumnSchema)

  return Column;
}