import AuthModel from './auth-model';
import { authLocal } from './passport'

class AuthService{
  register({Firstname, Lastname, PhoneNumber, Email, Password}){
    if(!Firstname){
      throw new Error ('Firstname is Required');
    }else if (!Lastname){
      throw new Error ('Lastname is Required');
    }else if (!PhoneNumber){
      throw new Error ('PhoneNumber is Required');
    }else if (!Email){
      throw new Error ('Email is Required');
    }else if (!Password){
      throw new Error ('Password is Required');
    }

    try{
      return AuthModel.create({Firstname, Lastname, PhoneNumber, Email, Password});
    } catch(error){
      throw error;
    }
  }

  loginMiddleware(req, res, next){
    return authLocal(req, res, next);
  }
}

export default new AuthService();
