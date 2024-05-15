import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            index: true,
            unique: true
        },
        password: {
            type: String,
        },
        phoneNumber: {
            type: String,
            default: ''
        },
        profilePicture: {
            type: String,
            default: ''
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        paymentDone: {
            type: Boolean,
            default: false
        },
        instagramClicks: {
            type: Number,
            default: 0
        },
        facebookClicks: {
            type: Number,
            default: 0
        },
        twitterClicks: {
            type: Number,
            default: 0
        },
        googleMapsClicks: {
            type: Number,
            default: 0
        },
        paymentType: {
            type: String,
            enum: ["Monthly", "Yearly", ""],
            default: ""
        },
        paymentDate: {
            type: Date,
            default: null
        },
        expiryDate: {
            type: Date,
            default: null
        },
        isTrial: {
            type: Boolean
        },
        accountType: {
            type: String,
            default: 'main'
        },
        isTrialVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;