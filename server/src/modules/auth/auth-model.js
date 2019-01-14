import mongoose, {Schema, Mongoose} from 'mongoose';

const AuthSchema = new Schema({
  email:String,
  username:String,
  password:String,
});

export default mongoose.model('Auth', AuthSchema);
