import jwt from 'jsonwebtoken'
import Registration from '../Models/RegisterationModel.js';
import { sendVerificationEmail } from '../utils/sendEmail.js';

export const RegisterUser = async (req, res) => {
    try {
        const tempData = await Registration.findOne({ email: req.body.email });
        if (tempData) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const registration = new Registration({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        await registration.save();
        sendVerificationEmail(req.body.name, req.body.email, registration._id);
        return res.status(200).json({ message: 'Registration Successful', registration });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const verifyUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Registration.findById(id);
        if (!data) throw new Error("User not found");
        data.isVerified = true;
        await data.save();
        return res.status(200).json({
            status: "success",
            message: "User verified successfully"
        })
    } catch (err) {
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.query;
        const user = await Registration.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        if (user.password !== password) {
            throw new Error('Invalid email or password');
        }
        // if (!user.isVerified) {
        //     throw new Error('User not verified');
        // }
        const token = jwt.sign({ userId: user._id }, process.env.ENCRYPTION_SECRET, { expiresIn: '1d' });
        return res.status(200).json({  message: 'Login successful', token, payment: user.paymentDone, userId: user._id });
    } catch (err) {
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}