import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';

class MailService {
	private transporter: nodeMailer.Transporter;

	constructor() {
		this.transporter = nodeMailer.createTransport({
            service: process.env.SMTP_SERVICE,
			host: process.env.SMTP_HOST,
			port: parseInt(process.env.SMTP_PORT || '587'),
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD_APP,
			},
		});
	}

	async sendActivationMail(to: string, link: string) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: `Account activation on ${process.env.API_URL}`,
			text: '',
			html: `
                    <div>
						<h1>The Best Chat Company welcome you!</h1>
                        <h2>Click on the link to activate your account</h2>
                        <a href="${link}">${link}</a>
                    </div>
                `,
		});
	}
}

export default new MailService();
