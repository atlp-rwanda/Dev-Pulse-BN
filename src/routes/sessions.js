import express  from 'express'
import sessions from '../controllers/sessionsController';
import { isManager } from '../middlewares/access';
import Authenticate from '../middlewares/auth';


const router = express.Router();



router.post('/',Authenticate,isManager,sessions.create);
router.get('/',Authenticate,isManager,sessions.getAll);
router.post('/',Authenticate,isManager,sessions.deleteBulk);


export default router;