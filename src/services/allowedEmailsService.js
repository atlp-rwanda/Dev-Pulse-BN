/* eslint-disable no-console */
import database from '../database/models';

const { allowedEmails } = database;

class AuthorizedEmailService {
  static async addEmail(emails) {
    try {
      const saveEmail = await allowedEmails.create({ email: emails });
      return saveEmail;
    } catch (error) {
      console.log('error', emails);
      throw error;
    }
  }

  static async addMultipleEmails(emails) {
    try {
      const saveEmail = await allowedEmails.bulkCreate(emails, { returning: true });
      return saveEmail;
    } catch (error) {
      console.log('error', emails);
      throw error;
    }
  }

  static async deleteMultipleEmails(emails) {
    try {
      const removeEmails = await allowedEmails.destroy({ where: { email: emails } });
      return removeEmails;
    } catch (error) {
      console.log('error', emails);
      throw error;
    }
  }

  static async deleteEmails(data) {
    try {
      const removeEmail = await allowedEmails.destroy({ where: data });
      return removeEmail;
    } catch (error) {
      console.log('error', data);
      throw error;
    }
  }
}

export default AuthorizedEmailService;
