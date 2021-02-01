
export default function (app: { mongoose: any }) {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const UserSchema = new Schema({
    name: {
      type: String
    },
    age: {
      type: Number
    },
    sex: {
      type: String
    },
    job: {
      type: String
    },
    lastTime: {
      type: Number
    }
  })

  const User = mongoose.model('Users', UserSchema)


  return User
}
