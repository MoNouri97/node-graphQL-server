import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, html: string) => {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	// const testAccount = await nodemailer.createTestAccount();
	// console.log(testAccount);

	// create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: 'mx4wp7ls724ehwmp@ethereal.email', // generated ethereal user
			pass: 'J3k7JYzcy8hwGqD18r', // generated ethereal password
		},
	});

	// send mail with defined transport object
	const info = await transporter.sendMail({
		from: '"Fred Foo 👻" <foo@example.com>', // sender address
		to,
		subject, // Subject line
		html, // html body
	});

	console.log('Message sent: %s', info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
