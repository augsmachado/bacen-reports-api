import express from "express";

import VetCtrl from "../controllers/vet.controller.js";

const router = express.Router();

// Provides a list of institutions with the average VET practiced in exchange operations that
// satisfy the informed set of parameters
router.route("/").get(VetCtrl.getVetRanking);

// Provides the existing purposes in the VET ranking
router.route("/purposes").get(VetCtrl.getVetPurposes);

// Provides a list of the existing forms of delivery of the foreign currency in the VET ranking
router.route("/delivery-forms").get(VetCtrl.getVetDeliveryForms);

// Provides a list of the existing currencies in the VET ranking
router.route("/currencies").get(VetCtrl.getVetCurrencies);

// Provides the list of existing destination countries in the VET ranking
router.route("/destination").get(VetCtrl.getVetDestination);

export default router;
