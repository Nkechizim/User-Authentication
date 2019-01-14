 const defaultConfig = {
   PORT: process.env.PORT || 2000,
 };

 const config = {
  development:{
    DB_URL: 'mongodb://localhost/user-authentication',
  },

  production:{
    DB_URL: 'mongodb://localhost/user-authentication2',
  }
 };

 function getEnv(env){
   return config[env];
  };

 export default{
   ...defaultConfig,
   ...getEnv(process.env.NODE_ENV),
 };
