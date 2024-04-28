import express from 'express';
import { getUserData, login, RegisterUser, sendEmail, updateUserData, verifyUser } from '../Controller/RegisterationController.js';

const RegisterationRoutes = express.Router();

RegisterationRoutes.route('/').get(login).post(RegisterUser)
RegisterationRoutes.route('/:id').get(getUserData).patch(updateUserData)
RegisterationRoutes.route('/verify/:id').patch(verifyUser)
RegisterationRoutes.route('/email').post(sendEmail)

// 
export default RegisterationRoutes;