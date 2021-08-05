/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import verify from '../middlewares/auth';
import AllowedEmails from '../controllers/mailListController';
import emailsValidation from '../validation/allowedEmailsValidation';
import { isManager } from '../middlewares/access';

const router = express.Router();

router.post('/', verify, isManager, emailsValidation.list, AllowedEmails.addEmails);
router.delete('/', verify, isManager, emailsValidation.list, AllowedEmails.deleteEmails);

export default router;
