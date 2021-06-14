export default function (app: { mongoose: any }) {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ColunmSchema = new Schema({
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

  const Colunm = mongoose.model('colunm', ColunmSchema)

  return Colunm;
}