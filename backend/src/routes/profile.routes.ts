import { Router } from "express";
import upload from "../middleware/multer.middleware";
import { createBio, getDisplaypicture, updateProfileInfo, uploadDisplayPicture,getUserInfo,suggestUser } from "../controller/profile.controller";
const router = Router();
router.get('/displaypicture/:username',getDisplaypicture)
router.get('/info/:username',getUserInfo)
router.get('/displaypicture/',getDisplaypicture)
router.get('/suggession',suggestUser)
router.post('/upload/displaypicture', upload.single('displaypicture'), uploadDisplayPicture)
router.post('/createbio', createBio)
router.patch('/update/:username', updateProfileInfo)
export default router