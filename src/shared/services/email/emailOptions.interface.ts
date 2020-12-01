export interface IEmailOptions {
  from: string;
  to: string;
  cc?: string[];
  bcc?: string[];
  subject: string;
  text: string;
  html: string;
}
