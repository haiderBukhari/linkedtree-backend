import mongoose from 'mongoose';

const paymentHistorySchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'registeration',
        },
        plan: {
            type: String,
            enum: ["Monthly", "Yearly", ""],
            default: ""
        },
        amount: {
            type: Number,
            default: 0
        },
        date: {
            type: Date,
            default: null
        },
        paymentMethod: {
            type: String,
            default: "Stripe"
        }
    },
    {
        timestamps: true,
    }
);

const paymentModel = mongoose.model('paymenthistory', paymentHistorySchema);

export default paymentModel;