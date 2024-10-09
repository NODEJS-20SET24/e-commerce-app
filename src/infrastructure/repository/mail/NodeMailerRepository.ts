import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '../../../common/Injectable';
import { Mail } from '../../../domain/entity/Mail';
import { MailerRepository } from '../../../domain/repository/MailerRepository';

@Injectable()
export class NodeMailerRepository implements MailerRepository {
  constructor(private readonly mailService: MailerService) {}
  async sendEmail(mail: Mail): Promise<void> {
    await this.mailService.sendMail({
      from: mail.from,
      to: mail.to,
      subject: mail.subject,
      text: mail.body
    });
  }
}
