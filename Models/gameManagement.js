import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },
        brandName: {
            type: String,
            default: ''
        },
        logo: {
            type: String,
            default: ''
        },
        options: {
            option1: {
                type: String,
                default: ''
            },
            option2: {
                type: String,
                default: ''
            },
            option3: {
                type: String,
                default: ''
            },
            option4: {
                type: String,
                default: ''
            },
            option5: {
                type: String,
                default: ''
            },
            option6: {
                type: String,
                default: ''
            },
            option7: {
                type: String,
                default: ''
            },
            option8: {
                type: String,
                default: ''
            },
        },
        instagram: {
            type: String,
            default: ''
        },
        tiktok: {
            type: String,
            default: ''
        },
        facebook: {
            type: String,
            default: ''
        },
        googleMaps: {
            type: String,
            default: ''
        },
        twitter: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true,
    }
);

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;