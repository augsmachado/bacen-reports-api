import express from "express";

import CCRCtrl from "../controllers/ccr.controller.js";

const router = express.Router();

// List of the financial institutions authorized to operate in CCR(agreement on reciprocal payments and credits)
router.route("/").get(CCRCtrl.getCCRFinancialInstitutions);

// List of the countries participats in CCR
router.route("/countries").get(CCRCtrl.getCCRCountries);

export default router;
