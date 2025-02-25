import express from "express";
import { sftpUpload } from "../controllers/file.js";

const router = express.Router();

router.post("/upload", sftpUpload);

export default router;