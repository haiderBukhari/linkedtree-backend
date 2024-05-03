import jwt from 'jsonwebtoken'
import Registration from '../Models/RegisterationModel.js';
// import { sendVerificationEmail } from '../utils/sendVerificationEmail.js';
import { Resend } from "resend"

const resend = new Resend("re_55SZ9Msc_B795Z4pRmpKaN2pnhTbt1TfT");

async function sendVerificationEmail(email, id){
    const data = await resend.emails.send({
        from: 'Onboarding <onboarding@ffsboyswah.com>',
        to: `${email}`,
        subject: 'Onboarding Verficiation Email Linkedtree',
        html: `<p>Thanks for Registering you can verify by clicking the below Link <br/> <strong> <a href="https://project-frontend-tree.vercel.app/verify?id=${id}">https://project-frontend-tree.vercel.app/verify?id=${id}</a></strong>!</p>`
    });
    console.log(data);
}

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
        await sendVerificationEmail(req.body.email, registration._id);
        await registration.save();
        return res.status(200).json({ message: 'Registration Successful', registration });
    } catch (error) {
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
        if (!user.isVerified) {
            await sendVerificationEmail(user.email, user._id);
        }
        const token = jwt.sign({ userId: user._id }, process.env.ENCRYPTION_SECRET, { expiresIn: '1d' });
        return res.status(200).json({ message: 'Login successful', token, isVerified: user.isVerified, payment: user.paymentDone, userId: user._id, name: user.name });
    } catch (err) {
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}


export const sendEmail = async (req, res) => {
    const email = req.body.email;
    try {
        if (!email) {
            throw new Error('email is required');
        }
        const user = await Registration.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        await sendVerificationEmail(email, user._id);
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

export const getUserData = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) {
            throw new Error('id is required');
        }
        const user = await Registration.findById(id);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

export const updateUserData = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) {
            throw new Error('id is required');
        }
        const user = await Registration.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}