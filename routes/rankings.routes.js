import express from "express";

import ClaimsCtrl from "../controllers/claims.controller.js";
import VetCtrl from "../controllers/vet.controller.js";

const router = express.Router();

// Request every claims per year
router.route("/claims").get(ClaimsCtrl.getEveryExistingClaims);

// Provides a list of institutions with the average VET practiced in exchange operations that
// satisfy the informed set of parameters
router.route("/vet").get(VetCtrl.getVetRanking);

// Provides the existing purposes in the VET ranking
router.route("/vet/purposes").get(VetCtrl.getVetPurposes);

// Provides a list of the existing forms of delivery of the foreign currency in the VET ranking
router.route("/vet/delivery-forms").get(VetCtrl.getVetDeliveryForms);

// Provides a list of the existing currencies in the VET ranking
router.route("/vet/currencies").get(VetCtrl.getVetCurrencies);

// Provides the list of existing destination countries in the VET ranking
router.route("/vet/destination").get(VetCtrl.getVetDestination);

export default router;
