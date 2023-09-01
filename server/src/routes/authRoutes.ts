import express, { Router } from "express";
import { login, register } from "../controller/auth";

const router: Router = express.Router();

/* POST */
router.post('/register', register)
router.post('/login', login)

export default router;