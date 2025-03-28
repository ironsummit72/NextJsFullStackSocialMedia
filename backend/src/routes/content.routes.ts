import {Router} from 'express'
import { streamContent } from '../controller/content.controller';

const router=Router();
router.get('/stream/:dir/:filename',streamContent)
export default router