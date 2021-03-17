
export default function (app: { mongoose: any }) {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const MessageSchema = new Schema({
    receiver: {
      type: String,
      required: [true, '接收者不能为空'],
      comment: '接收者id',
    },

    sender: {
      type: String,
      required: [true, '接收者不能为空'],
      comment: '发送者id',
    },
    reply: {
      type: String,
      comment: '回复id',
    },
    content: {
      type: String,
      required: [true, '内容不能为空'],
      comment: '内容',
    },
    forward: {
      type: String,
      comment: '转发',
    },
    status: {
      type: Number,

    },
    time: {
      type: Date,
      default: Date.now()
    },
  })


  const Message = mongoose.model('message', MessageSchema)


  return Message
}
