import { Router } from "express";
import { calculate, indexPage } from "../controllers";
import { validateCalculateVLSM } from "../middlewares";

const router:Router = Router();

router.get('/', indexPage);

router.post('/results', validateCalculateVLSM, calculate);

export default router;