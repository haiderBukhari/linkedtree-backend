import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';

export const sendVerificationEmail = (name, emailId, id) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		auth: {
			user: 'muhammad.hannan621@gmail.com',
			pass: process.env.ApplicationPassword,
		},
	});
	const mailGenerator = new Mailgen({
		theme: 'default',
		product: {
			name: 'Linkedtree',
			link: 'www.linktree.com',
		},
		header: {
			title: 'Yours truly',
			imageUrl: 'https://example.com/logo.png', // Replace with your logo image URL
		},
		footer: {
			name: "Hiii",
			title: 'Linkedtree',
			imageUrl: 'https://example.com/signature.png', // Replace with your signature image URL
		},
	});

	const email = {
		body: {
			name: name,
			intro: ``,
			action: {
				instructions: 'Thanks for Registering you can verify by clicking the below button:',
				button: {
					color: '#22BC66',
					text: 'Open App',
					link: `https://project-frontend-tree.vercel.app/verify?id=${id}`,
				},
			},
		},
	};

	const emailBody = mailGenerator.generate(email);

	const mailOptions = {
		from: 'muhammad.hannan621@gmail.com',
		to: emailId,
		subject: 'Verification Link',
		html: emailBody,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error('Error sending email:', error);
		} else {
			console.log('Email sent successfully:', info.response);
		}
	});
};
