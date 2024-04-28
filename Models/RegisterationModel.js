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
        }
    },
    {
        timestamps: true,
    }
);

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;