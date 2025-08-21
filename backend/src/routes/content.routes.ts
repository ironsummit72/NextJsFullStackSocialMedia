import {Router} from 'express'
import { streamContent, streamContentForStories } from '../controller/content.controller';

const router=Router();
router.get('/stream/:dir/:filename',streamContent)
router.get('/streamstories/:dir/:filename',streamContentForStories)
export default router