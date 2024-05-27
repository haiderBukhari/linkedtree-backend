import express from 'express';
import { createLandingPage, getALLLandingPages, getALLLandingPagesByOwner, getLandingPages, getSingleLandingPages, updateLandingPage } from '../Controller/gameManagementController.js';

const GameRoutes = express.Router();

GameRoutes.route('/').get(getALLLandingPages).post(createLandingPage)
GameRoutes.route('/:pageId').put(updateLandingPage)
GameRoutes.route('/update').get(getSingleLandingPages)
GameRoutes.route('/pages/:owner').get(getALLLandingPagesByOwner)
GameRoutes.route('/play').get(getLandingPages)

export default GameRoutes;