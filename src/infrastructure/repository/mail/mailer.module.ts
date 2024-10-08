import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        auth: {
          user: '<YOUR_USER>',
          pass: '<YOUR_PASWWORD>'
        }
      }
    })
  ],
  exports: [MailerModule]
})
export class MyMailerModule {}
