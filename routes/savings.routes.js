import express from "express";

import SavingsCtrl from "../controllers/savings.controller.js";

const router = express.Router();

// Request daily series of saving deposits
router.route("/").get(SavingsCtrl.getSavingDeposits);

export default router;
