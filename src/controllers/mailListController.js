/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */

import Response from '../helpers/response';
import AuthorizedEmailService from '../services/allowedEmailsService';

class AllowedEmails {
  async addEmails(req, res, next) {
    try {
      const { emails } = req.body;

      const toSaveEmails = [];
      emails.map((email) => toSaveEmails.push({ email }));
      const saveEmail = await AuthorizedEmailService.addMultipleEmails(toSaveEmails);

      if (saveEmail) {
        const succussSave = saveEmail.filter((email) => email.id !== null);
        const failedSave = saveEmail.filter((email) => email.id === null);
        if (succussSave.length && failedSave.length) {
          return Response.customMultiResponse(res, 200, 'Email(s) added successfully and others failed', succussSave, failedSave);
        }
        if (succussSave.length && !failedSave.length) {
          return Response.customMultiResponse(res, 200, 'All email(s) are added successfully', succussSave, failedSave);
        }
        return Response.customMultiResponse(res, 409, 'Conflicts, Email(s) already exist', succussSave, failedSave);
      }
    } catch (error) {
      return Response.conflictError(res, error);
    }
  }

  async deleteEmails(req, res, next) {
    try {
      const { emails } = req.body;
      const deleteEmail = await AuthorizedEmailService.deleteMultipleEmails(emails);
      if (deleteEmail) {
        return Response.customResponse(res, 200, 'Email(s) deleted successfully', deleteEmail);
      }
      return Response.customResponse(res, 404, 'Email(s) not found', deleteEmail);
    } catch (error) {
      console.log('Error', error);
      return next(error);
    }
  }
}

export default new AllowedEmails();
