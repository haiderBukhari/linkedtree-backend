import paymentModel from "../Models/paymentHistoryModel.js"

export const getPaymentHistory = async (req, res) => {
    const ownerId = req.params.id;
    try{
        const data = await paymentModel.find({ownerId});
        res.status(200).json({
            status: "success",
            data
        })
    }catch(err){
        res.status(400).json({
            status: "failed"
        })
    }
}