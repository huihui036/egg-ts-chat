
export default function (app: { mongoose: any }) {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    userName: {
      type: String,
      minlength: [6, '最小长度为6'],
      maxlength: [18, '最大度为18'],
      required: [true, '此项为必填内容'],
      comment: '用户名称',
    },
    account: {
      type: String,
      required: [true, 'account-此项为必填内容'],
      comment: '用户账号',
    },
    avatar: {
      type: String,
      comment: '用户头像',
    },
    password: {
      type: String,
      required: [true, '此项为必填内容'],
      comment: '用户密码',
    },
    email: {
      type: String,
      required: [true, '此项为必填内容'],
      comment: '邮箱',
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  });


  const User = mongoose.model('Users', UserSchema)

  return User;
}
