import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SendEmailDto } from "src/modules/users/dto/send-email.dto";
import * as Mailgen from "mailgen"

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Motor Shop Kenzie",
    link: "https://projeto-final-m6-g20-front-end-achf-git-e15bfb-motors-shop-g20.vercel.app"
  }
})

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }

  async sendEmail({ to, subject, text }: SendEmailDto) {
    await this.mailerService.sendMail({
      to,
      subject,
      html: text
    })
      .then(() => {
        console.log("Email enviado com sucesso")
      })
      .catch((err) => {
        console.log(err)
        throw new InternalServerErrorException("Erro ao enviar o email, tente novamente mais tarde")
      })

  }
  resetPasswordTemplate(userEmail: string, userName: string, resetToken: string) {
    const email = {
      body: {
        name: userName,
        intro: `Olá ${userName},`,
        action: {
          instructions: "Clique no botão abaixo para criar uma nova senha",
          button: {
            text: "Resetar senha",
            link: `https://projeto-final-m6-g20-front-end-achf-git-e15bfb-motors-shop-g20.vercel.app/resetPassword/${resetToken}`
          }
        }
      }

    }

    const emailBody = mailGenerator.generate(email)

    const emailTemplate = {
      to: userEmail,
      subject: "Reset Password Motors Shop",
      text: emailBody
    }

    return emailTemplate

  }



}

