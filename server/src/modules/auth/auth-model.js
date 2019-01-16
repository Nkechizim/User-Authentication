import mongoose, {Schema, Mongoose} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';

const AuthSchema = new Schema({
  Firstname:{
    type: String,
    trim: true,
    required: true,
  },
  Lastname:{
    type: String,
    trim: true,
    required: false,
  },
  PhoneNumber:{
    type: Number,
    trim: true,
    required: true,
    unique: true,
    validate: {
      validator(PhoneNumber){
        //return PhoneNumber.length >= 10 && PhoneNumber.length <= 15;
      },
      message: '{VALUE} IS NOT A VALID PHONE NUMBER!',
    },
  },
  Email:{
    type: String,
    unique: true,
    trim: true,
    required: true,
    validate: {
      validator(Email){
        const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9]{1,63}\.){1,125}[a-z]{2,63}$/;
        return emailRegex.test(Email);
      },
      message: '{VALUE} IS NOT A VALID EMAIL!',
    },
  },
  Password:{
    type: String,
    trim: true,
    required: true,
    validate: {
      validator(Password){
        return Password.length >= 6 && Password.length <= 15;
      },
      message: 'PASSWORD MUST BE BETWEEN 6 & 15 CHARACTERS!',
    },
  },
});

AuthSchema.plugin(uniqueValidator, {
  message: '{VALUE} already exists!',
});

AuthSchema.pre('save', function(next){
  if(this.isModified('Password')){
    this.Password = this._hashPassword(this.Password);
    return next();
  }
  return next();
});

AuthSchema.methods = {
  _hashPassword(Password){
    return hashSync(Password);
  },

  authenticateUser(Password){
    return compareSync(Password, this.Password);
  },

  toJSON(){
    return{
      _id: this._id,
      Firstname: this.Firstname,
      Lastname: this.Lastname,
      PhoneNumber: this.PhoneNumber,
      Email: this.Email,
    };
  },
};

export default mongoose.model('Auth', AuthSchema);
