/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import groupController from '../controllers/groupController';
import listValidator from '../validation/enginnerListValidator';
import verify from '../middlewares/auth';
import AllowedEmails from '../controllers/mailListController';
import emailsValidation from '../validation/allowedEmailsValidation';
import { isManager } from '../middlewares/access';

const router = express.Router();

router.post('/add',verify, isManager, emailsValidation.list, AllowedEmails.addEmails);
router.delete('/delete', verify, isManager, emailsValidation.list, AllowedEmails.deleteEmails);

export default router;
