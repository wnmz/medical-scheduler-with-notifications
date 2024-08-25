import nodemailer from 'nodemailer';
import { INotificationService } from './notificationService';
import { Patient } from 'my-prisma-client';

export class EmailNotificationService implements INotificationService {
    private transporter;

    constructor(
        private readonly service: string, 
        private readonly email: string, 
        private readonly pass: string
    ) {
        this.transporter = nodemailer.createTransport({
            service: this.service,
            auth: {
                user: this.email,
                pass: this.pass, 
            },
        });
    }

    async notify(patient: Patient, text: string): Promise<void> {
        console.log('email-notified ' + patient.name);

        const mailOptions = {
            from: this.email,
            to: patient.email,
            subject: "Уведомление о записи на приём", 
            text: text,
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email: ', error);
        }
    }

    getNotificationTypeName(): string {
        return "email";
    }
}