import express from "express";

import CirculationCtrl from "../controllers/circulation.controller.js";

const router = express.Router();

// Request daily records of the quantities of banknotes and coins in circulation
router.route("/").get(CirculationCtrl.getCurrencyCirculation);

// Request detailed daily records of the quantities of banknotes and coins in circulation
router.route("/detailed").get(CirculationCtrl.getCurrencyCirculationDetailed);

export default router;
