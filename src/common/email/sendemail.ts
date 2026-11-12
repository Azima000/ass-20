import nodemailer from "nodemailer";
import type { SendMailOptions } from "nodemailer";
import { env } from "../../configuration/env.service.js";

const Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.googleAccountEmail, // تأكدي إن الاسماء دي مطابقة لللي عندك في الـ env
        pass: env.googleAppPassword
    }
});

export const Send_Email = async ({ to, subject, html }: SendMailOptions) => {
    const info = await Transporter.sendMail({
        from: `Social media app <${env.googleAccountEmail}>`,
        to,
        subject,
        html
    });
    return info;
};