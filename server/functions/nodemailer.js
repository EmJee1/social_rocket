import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const nodemailerTransport = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	auth: {
		user: process.env.GMAIL_USERNAME,
		pass: process.env.GMAIL_PASSWORD,
	},
})

export const signupEmailVerificationOptions = (userEmail, verificationCode) => {
	return {
		from: `"Social Rocket Team" <${process.env.GMAIL_USERNAME}>`,
		to: userEmail,
		subject: 'Social Rocket email verification',
		text: `Welcome to Social Rocket! Please verify your mailaddress with this code: ${verificationCode}`,
		html: `<b>Welcome to Social Rocket!</b><br/>Please verify your mailaddress with this code: ${verificationCode}`,
	}
}

export const registrationEmail = (userEmail, userName) => {
	return {
		from: `"Social Rocket Team" <${process.env.GMAIL_USERNAME}>`,
		to: userEmail,
		subject: 'Social Rocket registration complete',
		text: `Helle there ${userName} and welcome to Social Rocket! We sent this mail to inform you that the registration on Social Rocket has been completed successfully, we're glad to have you onboard!`,
		html: `<b>Helle there ${userName} and welcome to Social Rocket!</b><br/>We sent this mail to inform you that the registration on Social Rocket has been completed successfully, we're glad to have you onboard!`,
	}
}