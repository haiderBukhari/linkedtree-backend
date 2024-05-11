import express from 'express';
import { createLandingPage, getALLLandingPages, getSingleLandingPages, updateLandingPage } from '../Controller/gameManagementController.js';

const GameRoutes = express.Router();

GameRoutes.route('/').get(getALLLandingPages).post(createLandingPage)
GameRoutes.route('/:pageId').put(updateLandingPage)
GameRoutes.route('/update').get(getSingleLandingPages)

export default GameRoutes;