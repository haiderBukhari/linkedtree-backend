import express from 'express';
import { login, RegisterUser, verifyUser } from '../Controller/RegisterationController.js';

const RegisterationRoutes = express.Router();

RegisterationRoutes.route('/').get(login).post(RegisterUser)
RegisterationRoutes.route('/verify/:id').patch(verifyUser)

export default RegisterationRoutes;