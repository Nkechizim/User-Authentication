import AuthModel from './auth-model';

class AuthService{
  register({email, username, password}){
    if(!email){
      throw new Error ('Email is Required');
    }else if (!username){
      throw new Error ('Username is Required');
    }else if (!password){
      throw new Error ('Password is Required');
    }

    try{
      return AuthModel.create({email, username, password});
    } catch(error){
      throw error;
    }
  }
}

export default new AuthService();
