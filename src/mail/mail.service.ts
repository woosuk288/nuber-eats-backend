import { Inject, Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import got from 'got';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  async sendEmail(subject: string, template: string, emailVars: EmailVar[]) {
    const form = new FormData();
    form.append('from', `Excited User <mailgun@${this.options.domain}>`);
    form.append('to', `woosuk288@gmail.com`);
    form.append('subject', subject);
    form.append('template', template);
    // form.append('v:code', 'hey mail gun~');
    // form.append('v:username', 'neo');
    emailVars.forEach((eVar) =>
      form.append(`v:${eVar.key}`, `v:${eVar.value}`),
    );

    try {
      const response = await got.post(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      );

      return true;
    } catch (error) {
      // console.log(error);
      return false;
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', 'email_confirm', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
