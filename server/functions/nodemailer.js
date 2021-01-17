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

export const signupEmailVerificationOptions = (
	userEmail,
	verificationCode
) => {
	return {
		from: `"Social Rocket Team" <${process.env.GMAIL_USERNAME}>`,
		to: userEmail,
		subject: 'Social Rocket verification',
		text: `Welcome to Social Rocket! Please verify your mailaddress with this code: ${verificationCode}`,
		html: `<b>Welcome to Social Rocket!</b><br/>Please verify your mailaddress with this code: ${verificationCode}`,
	}
}