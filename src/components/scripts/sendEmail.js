import nodemailer from 'nodemailer';
import express from 'express';
const app = express();
const port = 5000;

async function sendEmail() {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.APP_PASSWORD,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.USER,
            to: 'receiver mail adress',
            subject: 'Lab Tec Nueva Contraseña',
            html: '<img src="cid:logoTEC"/> <br/> Hola -nombre_profesor-: <br/> <br/> Su contraseña de LabTec ha sido modificada correctamente. <br> Su nueva contraseña es: <b>-nueva_contraseña-</b> <br> Gracias por pertenecer a LabTec.',
            attachments: [
                {
                    filename: 'logoTEC.png',
                    path: '../assets/logoTEC.png',
                    cid: 'logoTEC'
                }
            ]
        });


        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

sendEmail();