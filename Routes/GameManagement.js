import express from 'express';
import { createLandingPage, getALLLandingPages, getLandingPages, getSingleLandingPages, updateLandingPage } from '../Controller/gameManagementController.js';

const GameRoutes = express.Router();

GameRoutes.route('/').get(getALLLandingPages).post(createLandingPage)
GameRoutes.route('/:pageId').put(updateLandingPage)
GameRoutes.route('/update').get(getSingleLandingPages)
GameRoutes.route('/play').get(getLandingPages)

export default GameRoutes;