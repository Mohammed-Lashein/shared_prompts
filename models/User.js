import {model, models, Schema} from 'mongoose'

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  image: {
    type: String,
  }
})

const User = models.User || model('User', UserSchema)
// The above code checks if we created the user schema before then get it from the models , else create it as a new shcema . This helps us in preventing re-creating the schema each time we want to deal with the DB . 
export default User