import passport from 'passport';
import LocalStrategy from 'passport-local';

import AuthModel from './auth-model';

const localOpts = {
  usernameField: 'PhoneNumber',
  passwordField: 'Password',
};

const localLogin = new LocalStrategy(localOpts, async(PhoneNumber, Password, done) => {
  try{
    const user = await AuthModel.findOne({PhoneNumber});

    if(!user){
      return done(null, false);
    }else if(!user.authenticateUser(Password)){
      return done(null, false);
    }

    return done(null, user);
  }catch(error){
    return done(error, false);
  }
});

passport.use(localLogin);

export const authLocal = passport.authenticate('local', {session : false});
