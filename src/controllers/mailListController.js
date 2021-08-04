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
        return Response.customResponse(res, 200, 'Email(s) saved successfully', saveEmail);
      }
    } catch (error) {
      console.log('Error', error);
      return next(error);
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
