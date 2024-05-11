import Game from "../Models/gameManagement.js"

const getGameFormat = () => {
    const gameFormat = {
        ownerId: '',
        brandName: '',
        logo: '',
        options: {
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            option5: '',
            option6: '',
            option7: '',
            option8: '',
        },
        instagram: '',
        tiktok: '',
        facebook: '',
        googleMaps: '',
        twitter: '',
        content: '',
    }
}

export const createLandingPage = async (req, res) => {
    try{
        console.log(req.body)
        const data = await Game.create(req.body.gameFormat);
        res.status(200).json(data);
    }catch(err){
        res.status(400).json(err);
    }
}

export const getALLLandingPages = async (req, res) => {
    try{
        const {owner} = req.query;
        const data = await Game.find({ownerId: owner});
        res.status(200).json(data);
    }catch(err){
        res.status(400).json(err);
    }
}

export const getSingleLandingPages = async (req, res) => {
    try{
        const {pageId} = req.query;
        const data = await Game.findById(pageId);
        res.status(200).json(data);
    }catch(err){
        res.status(400).json(err);
    }
}

export const updateLandingPage = async (req, res) => {
    const {pageId} = req.params;
    try{
        const data = await Game.findByIdAndUpdate(pageId, req.body.gameFormat, {new: true});
        res.status(200).json(data);
    }catch(err){
        res.status(400).json(err);
    }
}