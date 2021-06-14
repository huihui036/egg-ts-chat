export default function (app: { mongoose: any }) {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const PostsSchema = new Schema({
    createdAt: {
      type: Date,
      default: Date.now(),
      comment: '创建时间',
    },
    excerpt: {
      type: String,
      required: [true, '简介项为必填内容'],
    },
    author: {
      type: String,
      required: [true, '作者为必填内容'],
      comment: '作者',
    },
    title: {
      type: String,
      required: [true, '标题项为必填内容'],
      comment: '标题',
    },
    column: {
      type: String,
      required: [true, '所属专题项为必填内容'],
      comment: '所属专题',
    },
    image: {
      type: Array,
      url: {
        type: String
      },
      comment: '首图',
    }
  })

  const Posts = mongoose.model('posts', PostsSchema)
  return Posts;
}