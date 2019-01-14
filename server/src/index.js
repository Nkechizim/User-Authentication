/* eslint-disable no-console */

import express from 'express';

import constants from './config/constants';
import './config/db';
import middlewares from './config/middlewares';

const app = express();

middlewares(app); 

app.listen(constants.PORT, (err)=>{
  if(err){
    throw err;
  }
  else console.log(`Server Connected on ${constants.PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});