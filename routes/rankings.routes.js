import express from "express";

import RankingsCtrl from "../controllers/rankings.controller.js";

const router = express.Router();

/** Request every claims per year
 * The ranking of claims consolidates the citizens claims against Financial Institutions that were
 * received, analyzed and closed by the Central Bank in each reference period. The calculation
 * of the claims index considers the amount of regulated claims with evidences of noncompliance
 * per each one million clients of the financial institution.
 */
router.route("/claims").get(RankingsCtrl.getEveryExistingClaims);

/**
 * Provides a list of the average VET practiced by institutions authorized by the Central Bank to operate
 * in the foreign exchange Market in the reference month, as of May 2013. Total Effective Value (VET)
 * represents the cost of a foreign exchange operation in reals per unit of foreign currency,
 * considering the exchange rate, taxes and tariffs eventually charged. Provides a list of
 * institutions with the average VET practiced in exchange operations that satisfy the informed set
 * of parameters.
 */
router.route("/vet").get();

/**
 * Provides the existing purposes in the VET ranking.
 */
router.route("/vet/purposes").get();

/**
 * Provides a list of the existing forms of delivery of the foreign currency in the VET ranking.
 */
router.route("/vet/delivery-forms").get();

/**
 * Provides a list of the existing currencies in the VET ranking.
 */
router.route("/vet/currencies").get();

router.route("/vet/destination").get();

export default router;
