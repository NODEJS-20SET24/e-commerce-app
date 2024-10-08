import { Cache } from '../entity/Cache';
import { Mail } from '../entity/Mail';

export abstract class MailerRepository {
  abstract sendEmail(mail: Mail): Promise<void>;
}
