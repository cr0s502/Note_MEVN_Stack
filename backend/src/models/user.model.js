
import { model, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const userSchema = new Schema({
  name: { 
    type: String,
    require: true
  },
  lastname: { 
    type: String,
    require: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: { 
    type: String,
    require: true
  },
  passwordHash: { 
    type: String,
    require: true
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

export default User
