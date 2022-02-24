import express from 'express';
import registerWithMongoDB from '../../mongoDB/controller/user/register';
import authenticateWithMongoDB from '../../mongoDB/controller/user/authenticate';
import changeDataAboutUserMongoDB from '../../mongoDB/controller/user/changeDataAboutUser';
import refreshToken from '../../utilsToken/refreshToken';
import auth from '../../utilsToken/checkIfAuth';
import changePasswordWithMongoDB from '../../mongoDB/controller/user/changePassword';
import process from 'process';
import authenticatePostgres from '../../postgres/controller/user/authenticate';
import changeDataAboutUserPostgres from '../../postgres/controller/user/changeDataAboutUser';
import changePasswordPostgres from '../../postgres/controller/user/changePassword';
import registerPostgres from '../../postgres/controller/user/register';

const userRouter = express.Router();
if (process.argv[2] === 'mongodb') {
  userRouter.post('/register', registerWithMongoDB);
  userRouter.post('/authenticate', authenticateWithMongoDB);
  userRouter.put('/profile', auth, changeDataAboutUserMongoDB);
  userRouter.post('/token', refreshToken);
  userRouter.post('/profile/password', auth, changePasswordWithMongoDB);
} else if (process.argv[2] === 'postgres') {
  userRouter.post('/register', registerPostgres);
  userRouter.post('/authenticate', authenticatePostgres);
  userRouter.put('/profile', auth, changeDataAboutUserPostgres);
  userRouter.post('/token', refreshToken);
  userRouter.post('/profile/password', auth, changePasswordPostgres);
}
export default userRouter;
