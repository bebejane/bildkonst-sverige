import * as postmark from 'postmark';
import { MessageSendingResponse } from 'postmark/dist/client/models/message/Message';

export const sendMail = async (to: string, template: string, templateModel: any): Promise<MessageSendingResponse> => {

  const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);
  const res = await postmarkClient.sendEmailWithTemplate({
    From: process.env.POSTMARK_FROM_EMAIL,
    To: to,
    TemplateAlias: template,
    TemplateModel: {
      sender_name: process.env.POSTMARK_FROM_NAME,
      site_url: process.env.NEXT_PUBLIC_SITE_URL,
      support_email: 'info@bildkonst-sverige.se',
      ...templateModel
    }
  })

  if (res.ErrorCode)
    throw new Error(`Det uppstod ett fel när mailet skickades. (${res.ErrorCode}) ${res.Message}`)

  return res
}